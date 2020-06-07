"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketDeleteLinkRes = exports.PacketDeleteLinkReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
class PacketDeleteLinkReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkId = bson_1.Long.ZERO) {
        super();
        this.LinkId = LinkId;
    }
    get PacketName() {
        return 'DELETELINK';
    }
    toBodyJson() {
        let obj = {
            'li': this.LinkId
        };
        return obj;
    }
}
exports.PacketDeleteLinkReq = PacketDeleteLinkReq;
class PacketDeleteLinkRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    get PacketName() {
        return 'DELETELINK';
    }
    readBodyJson(body) {
    }
}
exports.PacketDeleteLinkRes = PacketDeleteLinkRes;
//# sourceMappingURL=packet-delete-link.js.map