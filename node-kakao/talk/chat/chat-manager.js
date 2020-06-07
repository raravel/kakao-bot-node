"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManager = void 0;
const chat_deserialize_map_1 = require("./chat-deserialize-map");
const loco_packet_base_1 = require("../../packet/loco-packet-base");
const packet_delete_chat_1 = require("../../packet/packet-delete-chat");
class ChatManager {
    constructor(client) {
        this.client = client;
        this.messageId = 0;
    }
    get Client() {
        return this.client;
    }
    get CurrentMessageId() {
        return this.messageId;
    }
    getNextMessageId() {
        return this.messageId++;
    }
    async chatFromChatlog(chatLog) {
        let channel = await this.Client.ChannelManager.get(chatLog.ChannelId);
        let sender = this.Client.UserManager.get(chatLog.SenderId);
        const TypedChat = chat_deserialize_map_1.ChatDeserializeMap.getChatConstructor(chatLog.Type);
        return new TypedChat(channel, sender, chatLog.MessageId, chatLog.LogId, chatLog.PrevLogId, chatLog.SendTime, chatLog.Text, chatLog.RawAttachment);
    }
    async deleteChat(channelId, logId) {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_delete_chat_1.PacketDeleteChatReq(channelId, logId));
        return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
    }
}
exports.ChatManager = ChatManager;
//# sourceMappingURL=chat-manager.js.map