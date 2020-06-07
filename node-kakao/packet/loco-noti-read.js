"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMessageNotiReadRes = exports.PacketMessageNotiReadReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
class PacketMessageNotiReadReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO) {
        super();
        this.ChannelId = ChannelId;
    }
    get PacketName() {
        return 'NOTIREAD';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId
        };
    }
}
exports.PacketMessageNotiReadReq = PacketMessageNotiReadReq;
class PacketMessageNotiReadRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status) {
        super(status);
    }
    get PacketName() {
        return 'NOTIREAD';
    }
    readBodyJson(rawJson) {
    }
}
exports.PacketMessageNotiReadRes = PacketMessageNotiReadRes;
//# sourceMappingURL=loco-noti-read.js.map