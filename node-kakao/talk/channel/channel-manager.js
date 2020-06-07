"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelManager = void 0;
const store_1 = require("../../store/store");
const chat_channel_1 = require("./chat-channel");
const bson_1 = require("bson");
const packet_create_chat_1 = require("../../packet/packet-create-chat");
const packet_chatinfo_1 = require("../../packet/packet-chatinfo");
const packet_leave_1 = require("../../packet/packet-leave");
const channel_type_1 = require("../chat/channel-type");
const loco_packet_base_1 = require("../../packet/loco-packet-base");
const packet_chat_on_room_1 = require("../../packet/packet-chat-on-room");
class ChannelManager extends store_1.AsyncIdStore {
    constructor(client) {
        super();
        this.client = client;
    }
    get Client() {
        return this.client;
    }
    getChannelList() {
        return Array.from(super.values());
    }
    get(id) {
        return super.get(id, true);
    }
    async createChannel(users, nickname = '', profileURL = '') {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_create_chat_1.PacketCreateChatReq(users.map((user) => user.Id), nickname, profileURL));
        if (this.has(res.ChannelId))
            return this.get(res.ChannelId);
        let chan = this.channelFromChatData(res.ChannelId, res.ChatInfo);
        this.setCache(res.ChannelId, chan);
        return chan;
    }
    async fetchValue(id) {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_chatinfo_1.PacketChatInfoReq(id));
        return this.channelFromChatData(id, res.ChatInfo);
    }
    channelFromChatData(id, chatData) {
        let channel;
        switch (chatData.Type) {
            case channel_type_1.ChannelType.OPENCHAT_DIRECT:
            case channel_type_1.ChannelType.OPENCHAT_GROUP:
                channel = new chat_channel_1.OpenChatChannel(this.client, id, chatData.Type, chatData.OpenLinkId, chatData.OpenChatToken);
                break;
            case channel_type_1.ChannelType.GROUP:
            case channel_type_1.ChannelType.PLUSCHAT:
            case channel_type_1.ChannelType.DIRECT:
            case channel_type_1.ChannelType.SELFCHAT:
                channel = new chat_channel_1.ChatChannel(this.client, id, chatData.Type);
                break;
            default:
                channel = new chat_channel_1.ChatChannel(this.client, id, channel_type_1.ChannelType.UNKNOWN);
                break;
        }
        return channel;
    }
    async requestChannelInfo(channelId) {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_chatinfo_1.PacketChatInfoReq(channelId));
        if (res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS || res.StatusCode === loco_packet_base_1.StatusCode.PARTIAL) {
            return res.ChatInfo;
        }
        else {
            throw new Error('Received wrong info packet');
        }
    }
    async requestChatOnRoom(channel) {
        let packet = new packet_chat_on_room_1.PacketChatOnRoomReq(channel.Id, channel.LastChat ? channel.LastChat.LogId : bson_1.Long.ZERO);
        if (channel.isOpenChat()) {
            packet.OpenChatToken = channel.OpenToken;
        }
        return await this.client.NetworkManager.requestPacketRes(packet);
    }
    async leave(channel, block = false) {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_leave_1.PacketLeaveReq(channel.Id, block));
        return res.StatusCode !== loco_packet_base_1.StatusCode.SUCCESS;
    }
    removeChannel(channel) {
        let id = channel.Id;
        if (!this.has(id))
            return false;
        this.delete(id);
        return true;
    }
    initalizeLoginData(chatDataList) {
        this.clear();
        for (let chatData of chatDataList) {
            let channel = this.channelFromChatData(chatData.ChannelId, chatData);
            this.setCache(channel.Id, channel);
        }
    }
}
exports.ChannelManager = ChannelManager;
//# sourceMappingURL=channel-manager.js.map