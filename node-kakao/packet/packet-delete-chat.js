"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketDeleteChatRes = exports.PacketDeleteChatReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
class PacketDeleteChatReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO, LogId = bson_1.Long.ZERO) {
        super();
        this.ChannelId = ChannelId;
        this.LogId = LogId;
    }
    get PacketName() {
        return 'DELETEMSG';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId,
            'logId': this.LogId
        };
    }
}
exports.PacketDeleteChatReq = PacketDeleteChatReq;
class PacketDeleteChatRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    get PacketName() {
        return 'DELETEMSG';
    }
    readBodyJson(body) {
    }
}
exports.PacketDeleteChatRes = PacketDeleteChatRes;
//# sourceMappingURL=packet-delete-chat.js.map