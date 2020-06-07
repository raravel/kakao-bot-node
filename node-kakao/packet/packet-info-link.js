"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketInfoLinkRes = exports.PacketInfoLinkReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const open_link_struct_1 = require("../talk/struct/open-link-struct");
class PacketInfoLinkReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkIdList = []) {
        super();
        this.LinkIdList = LinkIdList;
    }
    get PacketName() {
        return 'INFOLINK';
    }
    toBodyJson() {
        let obj = {
            'lis': this.LinkIdList
        };
        return obj;
    }
}
exports.PacketInfoLinkReq = PacketInfoLinkReq;
class PacketInfoLinkRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, LinkList = []) {
        super(status);
        this.LinkList = LinkList;
    }
    get PacketName() {
        return 'INFOLINK';
    }
    readBodyJson(rawBody) {
        let list = rawBody['ols'];
        this.LinkList = [];
        for (let raw of list) {
            let link = new open_link_struct_1.OpenLinkStruct();
            link.fromJson(raw);
            this.LinkList.push(link);
        }
    }
}
exports.PacketInfoLinkRes = PacketInfoLinkRes;
//# sourceMappingURL=packet-info-link.js.map