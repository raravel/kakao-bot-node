"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketPingRes = exports.PacketPingReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
class PacketPingReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    get PacketName() {
        return 'PING';
    }
    toBodyJson() {
        return {};
    }
}
exports.PacketPingReq = PacketPingReq;
class PacketPingRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    get PacketName() {
        return 'PING';
    }
    readBodyJson() {
    }
}
exports.PacketPingRes = PacketPingRes;
//# sourceMappingURL=packet-ping.js.map