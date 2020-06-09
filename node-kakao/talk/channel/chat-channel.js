"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenChatChannel = exports.ChatChannel = void 0;
const events_1 = require("events");
const packet_message_1 = require("../../packet/packet-message");
const chat_type_1 = require("../chat/chat-type");
const chatlog_struct_1 = require("../struct/chatlog-struct");
const chat_builder_1 = require("../chat/chat-builder");
const loco_noti_read_1 = require("../../packet/loco-noti-read");
const json_util_1 = require("../../util/json-util");
const channel_info_1 = require("./channel-info");
const open_link_type_1 = require("../open/open-link-type");
const feed_type_1 = require("../feed/feed-type");
class ChatChannel extends events_1.EventEmitter {
    constructor(client, id, type) {
        super();
        this.client = client;
        this.id = id;
        this.type = type;
        this.channelInfo = this.createChannelInfo();
        this.lastChat = null;
    }
    createChannelInfo() {
        return new channel_info_1.ChannelInfo(this);
    }
    get Client() {
        return this.client;
    }
    get LastChat() {
        return this.lastChat;
    }
    get Id() {
        return this.id;
    }
    get Type() {
        return this.type;
    }
    async getChannelInfo(forceUpdate = false) {
        if (forceUpdate || this.channelInfo.LastInfoUpdated + ChatChannel.INFO_UPDATE_INTERVAL <= Date.now()) {
            await this.channelInfo.updateInfo();
        }
        return this.channelInfo;
    }
    chatReceived(chat) {
        this.lastChat = chat;
        this.emit('message', chat);
        this.client.emit('message', chat);
    }
    async markChannelRead() {
        await this.Client.NetworkManager.sendPacket(new loco_noti_read_1.PacketMessageNotiReadReq(this.id));
    }
    async sendText(...textFormat) {
        let { text, extra } = chat_builder_1.ChatBuilder.buildMessage(...textFormat);
        let extraText = json_util_1.JsonUtil.stringifyLoseless(extra);
        let userId = this.client.ClientUser.Id;
        let res = await this.client.NetworkManager.requestPacketRes(new packet_message_1.PacketMessageWriteReq(this.client.ChatManager.getNextMessageId(), this.id, text, chat_type_1.ChatType.Text, false, extraText));
        let chat = await this.client.ChatManager.chatFromChatlog(new chatlog_struct_1.ChatlogStruct(res.LogId, res.PrevLogId, userId, this.id, chat_type_1.ChatType.Text, text, Math.floor(Date.now() / 1000), extraText, res.MessageId));
        return chat;
    }
    async sendRichFeed(text) {
        let str = JSON.stringify({ feedType: feed_type_1.FeedType.RICH_CONTENT, });
        let extraText = JSON.stringify({ text, });
        let userId = this.client.ClientUser.Id;
        let res = await this.client.NetworkManager.requestPacketRes(new packet_message_1.PacketMessageWriteReq(this.client.ChatManager.getNextMessageId(), this.id, str, chat_type_1.ChatType.Feed, false, extraText));
        let chat = await this.client.ChatManager.chatFromChatlog(new chatlog_struct_1.ChatlogStruct(res.LogId, res.PrevLogId, userId, this.id, chat_type_1.ChatType.Text, str, Math.floor(Date.now() / 1000), extraText, res.MessageId));
        return chat;
    }
    async sendTemplate(template) {
        if (!template.Valid) {
            throw new Error('Invalid template');
        }
        let sentType = template.getMessageType();
        let text = template.getPacketText();
        let extra = template.getPacketExtra();
        let res = await this.client.NetworkManager.requestPacketRes(new packet_message_1.PacketMessageWriteReq(this.client.ChatManager.getNextMessageId(), this.id, text, sentType, false, extra));
        let chat = this.client.ChatManager.chatFromChatlog(new chatlog_struct_1.ChatlogStruct(res.LogId, res.PrevLogId, this.client.ClientUser.Id, this.id, sentType, template.getPacketText(), Math.floor(Date.now() / 1000), extra, res.MessageId));
        return chat;
    }
    async leave(block = false) {
        return this.client.ChannelManager.leave(this, block);
    }
    isOpenChat() {
        return false;
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.ChatChannel = ChatChannel;
ChatChannel.INFO_UPDATE_INTERVAL = 300000;
class OpenChatChannel extends ChatChannel {
    constructor(client, channelId, type, linkId, openToken) {
        super(client, channelId, type);
        this.linkId = linkId;
        this.openToken = openToken;
    }
    createChannelInfo() {
        return new channel_info_1.OpenChannelInfo(this);
    }
    async getChannelInfo(forceUpdate = false) {
        return super.getChannelInfo(forceUpdate);
    }
    get LinkId() {
        return this.linkId;
    }
    get OpenToken() {
        return this.openToken;
    }
    isOpenChat() {
        return true;
    }
    async kickMember(user) {
        return this.kickMemberId(user.Id);
    }
    async kickMemberId(userId) {
        if (!(await this.getChannelInfo()).canManageChannel(this.Client.ClientUser))
            return false;
        return this.Client.OpenChatManager.kickMember(this, userId);
    }
    async deleteLink() {
        if (!(await this.getChannelInfo()).LinkOwner.isClientUser())
            return false;
        return this.Client.OpenChatManager.deleteLink(this.linkId);
    }
    async hideChat(chat) {
        return this.hideChatId(chat.LogId);
    }
    async hideChatId(logId) {
        if (!(await this.getChannelInfo()).canManageChannel(this.Client.ClientUser))
            return false;
        return this.Client.OpenChatManager.hideChat(this, logId);
    }
    async changeToMainProfile() {
        return this.Client.OpenChatManager.changeProfile(this, open_link_type_1.OpenchatProfileType.MAIN);
    }
    async changeToKakaoProfile(nickname, profilePath) {
        return this.Client.OpenChatManager.changeProfile(this, open_link_type_1.OpenchatProfileType.KAKAO_ANON, nickname, profilePath);
    }
    async changeToLinkProfile(profileLinkId) {
        return this.Client.OpenChatManager.changeProfile(this, open_link_type_1.OpenchatProfileType.OPEN_PROFILE, profileLinkId);
    }
    async setOpenMemberType(user, memberType) {
        return this.setOpenMemberTypeId(user.Id, memberType);
    }
    async setOpenMemberTypeId(userId, memberType) {
        if (!(await this.getChannelInfo()).hasUserInfo(userId))
            return false;
        return this.Client.OpenChatManager.setOpenMemberType(this, userId, memberType);
    }
    async getOpenProfile() {
        return this.Client.OpenChatManager.get(this.linkId);
    }
}
exports.OpenChatChannel = OpenChatChannel;
//# sourceMappingURL=chat-channel.js.map