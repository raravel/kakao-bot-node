"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketLinkKickedRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
class PacketLinkKickedRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.ChannelId = ChannelId;
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'LINKKICKED';
    }
    readBodyJson(body) {
        this.ChannelId = body['c'];
        if (body['chatLog']) {
            this.Chatlog.fromJson(body['chatLog']);
        }
    }
}
exports.PacketLinkKickedRes = PacketLinkKickedRes;
//# sourceMappingURL=packet-link-kicked.js.map