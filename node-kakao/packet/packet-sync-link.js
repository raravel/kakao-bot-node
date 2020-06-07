"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSyncLinkRes = exports.PacketSyncLinkReq = void 0;
const open_link_struct_1 = require("../talk/struct/open-link-struct");
const loco_bson_packet_1 = require("./loco-bson-packet");
class PacketSyncLinkReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(OpenChatToken = 0) {
        super();
        this.OpenChatToken = OpenChatToken;
    }
    get PacketName() {
        return 'SYNCLINK';
    }
    toBodyJson() {
        let obj = {
            'ltk': this.OpenChatToken
        };
        return obj;
    }
}
exports.PacketSyncLinkReq = PacketSyncLinkReq;
class PacketSyncLinkRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, LinkList = [], IdList = [], OpenChatToken = 0) {
        super(status);
        this.LinkList = LinkList;
        this.IdList = IdList;
        this.OpenChatToken = OpenChatToken;
    }
    get PacketName() {
        return 'SYNCLINK';
    }
    readBodyJson(body) {
        this.LinkList = [];
        if (body['ols']) {
            for (let rawStruct of body['ols']) {
                let linkStruct = new open_link_struct_1.OpenLinkStruct();
                linkStruct.fromJson(rawStruct);
                this.LinkList.push(linkStruct);
            }
        }
        if (body['dlis'])
            this.IdList = body['dlis'];
        this.OpenChatToken = body['ltk'];
    }
}
exports.PacketSyncLinkRes = PacketSyncLinkRes;
//# sourceMappingURL=packet-sync-link.js.map