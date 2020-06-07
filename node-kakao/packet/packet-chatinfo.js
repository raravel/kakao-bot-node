"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketChatInfoRes = exports.PacketChatInfoReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chat_info_struct_1 = require("../talk/struct/chat-info-struct");
class PacketChatInfoReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO) {
        super();
        this.ChannelId = ChannelId;
    }
    get PacketName() {
        return 'CHATINFO';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId
        };
    }
}
exports.PacketChatInfoReq = PacketChatInfoReq;
class PacketChatInfoRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChatInfo = new chat_info_struct_1.ChatInfoStruct()) {
        super(status);
        this.ChatInfo = ChatInfo;
    }
    get PacketName() {
        return 'CHATINFO';
    }
    readBodyJson(rawJson) {
        this.ChatInfo = new chat_info_struct_1.ChatInfoStruct();
        if (rawJson['chatInfo']) {
            this.ChatInfo.fromJson(rawJson['chatInfo']);
        }
    }
}
exports.PacketChatInfoRes = PacketChatInfoRes;
//# sourceMappingURL=packet-chatinfo.js.map