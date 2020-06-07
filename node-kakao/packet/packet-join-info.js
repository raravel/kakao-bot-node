"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketJoinInfoRes = exports.PacketJoinInfoReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const open_link_struct_1 = require("../talk/struct/open-link-struct");
class PacketJoinInfoReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(OpenLinkURL = '', LinkRef = '') {
        super();
        this.OpenLinkURL = OpenLinkURL;
        this.LinkRef = LinkRef;
    }
    get PacketName() {
        return 'JOININFO';
    }
    toBodyJson() {
        return {
            'lu': this.OpenLinkURL,
            'ref': this.LinkRef
        };
    }
}
exports.PacketJoinInfoReq = PacketJoinInfoReq;
class PacketJoinInfoRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, OpenLink = new open_link_struct_1.OpenLinkStruct()) {
        super(status);
        this.OpenLink = OpenLink;
    }
    get PacketName() {
        return 'JOININFO';
    }
    readBodyJson(body) {
        if (body['ol'])
            this.OpenLink.fromJson(body['ol']);
    }
}
exports.PacketJoinInfoRes = PacketJoinInfoRes;
//# sourceMappingURL=packet-join-info.js.map