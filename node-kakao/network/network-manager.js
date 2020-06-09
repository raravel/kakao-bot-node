"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkPacketHandler = exports.NetworkManager = void 0;
const __1 = require("..");
const loco_manager_1 = require("../loco/loco-manager");
const events_1 = require("events");
const packet_kickout_1 = require("../packet/packet-kickout");
const feed_type_1 = require("../talk/feed/feed-type");
const chat_feed_1 = require("../talk/chat/chat-feed");
class NetworkManager {
    constructor(client) {
        this.client = client;
        this.handler = this.createPacketHandler();
        this.locoManager = new loco_manager_1.LocoManager(this.handler);
        this.cachedBookingData = null;
        this.cachedCheckinData = null;
        this.latestCheckinReq = -1;
    }
    createPacketHandler() {
        return new TalkPacketHandler(this);
    }
    get Client() {
        return this.client;
    }
    get LocoManager() {
        return this.locoManager;
    }
    get NeedReLogin() {
        return this.locoManager.NeedRelogin;
    }
    get Connected() {
        return this.locoManager.LocoConnected;
    }
    get Logon() {
        return this.locoManager.LocoLogon;
    }
    async getCachedBooking(forceRecache = false) {
        if (!this.cachedBookingData || forceRecache) {
            this.cachedBookingData = await this.locoManager.getBookingData();
        }
        return this.cachedBookingData;
    }
    async getCachedCheckin(userId, forceRecache = false) {
        if (!this.cachedCheckinData || this.cachedCheckinData.expireTime + this.latestCheckinReq < Date.now() || forceRecache) {
            this.cachedCheckinData = await this.locoManager.getCheckinData((await this.getCachedBooking()).CheckinHost, userId);
            this.latestCheckinReq = Date.now();
        }
        return this.cachedCheckinData;
    }
    async locoLogin(deviceUUID, userId, accessToken) {
        if (this.Logon) {
            throw new Error('Already logon to loco');
        }
        let checkinData = await this.getCachedCheckin(userId);
        await this.locoManager.connectToLoco(checkinData.LocoHost, checkinData.expireTime);
        return await this.locoManager.loginToLoco(deviceUUID, accessToken);
    }
    async logout() {
        if (!this.Logon) {
            throw new Error('Not logon to loco');
        }
        await this.disconnect();
    }
    async disconnect() {
        if (!this.locoManager.LocoConnected) {
            throw new Error('Not connected to loco');
        }
        this.locoManager.disconnect();
    }
    async sendPacket(packet) {
        return this.locoManager.sendPacket(packet);
    }
    async requestPacketRes(packet) {
        this.sendPacket(packet);
        return packet.submitResponseTicket();
    }
}
exports.NetworkManager = NetworkManager;
class TalkPacketHandler extends events_1.EventEmitter {
    constructor(networkManager) {
        super();
        this.kickReason = packet_kickout_1.LocoKickoutType.UNKNOWN;
        this.networkManager = networkManager;
        this.setMaxListeners(1000);
        this.on('MSG', this.onMessagePacket.bind(this));
        this.on('NEWMEM', this.onNewMember.bind(this));
        this.on('DECUNREAD', this.onMessageRead.bind(this));
        this.on('JOINLINK', this.onOpenChannelJoin.bind(this));
        this.on('SYNCLINKCR', this.syncOpenChannelJoin.bind(this));
        this.on('SYNCMEMT', this.syncMemberTypeChange.bind(this));
        this.on('SYNCLINKPF', this.syncProfileUpdate.bind(this));
        this.on('KICKMEM', this.onOpenChannelKick.bind(this));
        this.on('DELMEM', this.onMemberDelete.bind(this));
        this.on('LINKKICKED', this.onLinkKicked.bind(this));
        this.on('SYNCJOIN', this.onChannelJoin.bind(this));
        this.on('SYNCDLMSG', this.syncMessageDelete.bind(this));
        this.on('LEFT', this.onChannelLeft.bind(this));
        this.on('LEAVE', this.onChannelLeave.bind(this));
        this.on('KICKOUT', this.onLocoKicked.bind(this));
    }
    get NetworkManager() {
        return this.networkManager;
    }
    get Client() {
        return this.networkManager.Client;
    }
    get ChatManager() {
        return this.Client.ChatManager;
    }
    get ChannelManager() {
        return this.Client.ChannelManager;
    }
    get UserManager() {
        return this.Client.UserManager;
    }
    onRequest(packetId, packet) {
    }
    onResponse(packetId, packet, reqPacket) {
        this.emit(packet.PacketName, packet, reqPacket);
    }
    onDisconnected() {
        this.Client.emit('disconnected', this.kickReason);
    }
    async onMessagePacket(packet) {
        let channel = await this.ChannelManager.get(packet.ChannelId);
        let chatLog = packet.Chatlog;
        let chat = await this.ChatManager.chatFromChatlog(chatLog);
        let userInfo = (await chat.Channel.getChannelInfo()).getUserInfo(chat.Sender);
        if (userInfo)
            chat.Sender.updateNickname(packet.SenderNickname);
        channel.chatReceived(chat);
    }
    async onMessageRead(packet) {
        let channel = await this.ChannelManager.get(packet.ChannelId);
        let channelInfo = await channel.getChannelInfo();
        let reader = this.UserManager.get(packet.ReaderId);
        let watermark = packet.Watermark;
        reader.emit('message_read', channel, watermark);
        this.Client.emit('message_read', channel, reader, watermark);
    }
    async onNewMember(packet) {
        let channel = await this.ChannelManager.get(packet.Chatlog.ChannelId);
        let channelInfo = await channel.getChannelInfo();
        let chatlog = packet.Chatlog;
        let feed = chat_feed_1.ChatFeed.getFeedFromText(chatlog.Text);
        let idList = [];
        if (feed.FeedType === feed_type_1.FeedType.INVITE && feed.MemberList) {
            for (let member of feed.MemberList) {
                idList.push(member.UserId);
            }
        }
        else if (feed.FeedType === feed_type_1.FeedType.OPENLINK_JOIN && feed.Member) {
            idList.push(feed.Member.UserId);
        }
        for (let id of idList) {
            let user = this.UserManager.get(id);
            if (user.isClientUser()) {
                user.emit('join', channel, feed);
                this.Client.emit('join_channel', channel);
            }
            else {
                await channelInfo.addUserInfo(id);
                user.emit('join', channel, feed);
                channel.emit('join', user, feed);
                this.Client.emit('user_join', channel, user, feed);
            }
        }
    }
    async syncMessageDelete(packet) {
        let chat = await this.ChatManager.chatFromChatlog(packet.Chatlog);
        if (!chat.isFeed())
            return;
        let feed = chat.getFeed();
        if (feed.FeedType !== feed_type_1.FeedType.DELETE_TO_ALL)
            return;
        this.Client.emit('message_deleted', feed.LogId || __1.Long.ZERO, feed.Hidden || false);
    }
    async onChannelLeft(packet) {
        let channel = await this.ChannelManager.get(packet.ChannelId);
        this.Client.emit('left_channel', channel);
        this.ChannelManager.removeChannel(channel);
    }
    async onChannelLeave(packet, reqPacket) {
        if (!reqPacket)
            return;
        let chanId = reqPacket.ChannelId;
        if (!this.ChannelManager.has(chanId))
            return;
        let channel = await this.ChannelManager.get(chanId);
        this.Client.emit('left_channel', channel);
        this.ChannelManager.removeChannel(channel);
    }
    async onLinkKicked(packet) {
        let channel = await this.ChannelManager.get(packet.ChannelId);
        this.Client.emit('left_channel', channel);
        this.ChannelManager.removeChannel(channel);
    }
    async onChannelJoin(packet) {
        let chanId = packet.ChannelId;
        let newChan = await this.ChannelManager.get(chanId);
        this.Client.emit('join_channel', newChan);
    }
    async onOpenChannelJoin(packet) {
        if (!packet.ChatInfo)
            return;
        let chanId = packet.ChatInfo.ChannelId;
        if (this.ChannelManager.has(chanId))
            return;
        let newChan = await this.ChannelManager.get(chanId);
        this.Client.emit('join_channel', newChan);
    }
    async syncOpenChannelJoin(packet) {
        if (!packet.ChatInfo)
            return;
        let chanId = packet.ChatInfo.ChannelId;
        if (this.ChannelManager.has(chanId))
            return;
        let newChan = await this.ChannelManager.get(chanId);
        this.Client.emit('join_channel', newChan);
    }
    async syncMemberTypeChange(packet) {
        let chanId = packet.ChannelId;
        let channel = await this.ChannelManager.get(chanId);
        if (!channel.isOpenChat())
            return;
        let info = (await channel.getChannelInfo());
        let len = packet.MemberIdList.length;
        for (let i = 0; i < len; i++) {
            info.updateMemberType(packet.MemberIdList[i], packet.MemberTypeList[i]);
        }
    }
    async syncProfileUpdate(packet) {
        let chanId = packet.ChannelId;
        if (chanId.equals(__1.Long.ZERO))
            return;
        let channel = await this.ChannelManager.get(chanId);
        let info = await channel.getChannelInfo();
        let userInfo = info.getUserInfoId(packet.OpenMember.UserId);
        if (!userInfo)
            return;
        userInfo.updateFromOpenStruct(packet.OpenMember);
    }
    async onOpenChannelKick(packet) {
        let chanId = packet.ChannelId;
        if (!this.ChannelManager.has(chanId))
            return;
        let channel = await this.ChannelManager.get(chanId);
        let chat = await this.ChatManager.chatFromChatlog(packet.Chatlog);
        if (!chat.isFeed())
            return;
        let feed = chat.getFeed();
        if (!feed.Member)
            return;
        let info = await chat.Channel.getChannelInfo();
        let kickedUser = this.UserManager.get(feed.Member.UserId);
        kickedUser.emit('left', channel, feed);
        channel.emit('left', kickedUser, feed);
        this.Client.emit('user_left', kickedUser, feed);
        if (!this.Client.ClientUser.Id.equals(feed.Member.UserId))
            info.removeUserInfo(feed.Member.UserId);
    }
    async onMemberDelete(packet) {
        let chatLog = packet.Chatlog;
        let channel = await this.ChannelManager.get(chatLog.ChannelId);
        let chat = await this.ChatManager.chatFromChatlog(chatLog);
        if (!chat.isFeed())
            return;
        let feed = chat.getFeed();
        if (!feed.Member)
            return;
        let info = await chat.Channel.getChannelInfo();
        let leftUser = this.UserManager.get(feed.Member.UserId);
        leftUser.emit('left', channel, feed);
        channel.emit('left', leftUser, feed);
        this.Client.emit('user_left', leftUser, feed);
        info.removeUserInfo(feed.Member.UserId);
    }
    onLocoKicked(packet) {
        let reason = packet.Reason;
        this.kickReason = reason;
    }
}
exports.TalkPacketHandler = TalkPacketHandler;
//# sourceMappingURL=network-manager.js.map