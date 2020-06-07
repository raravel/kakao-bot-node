"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketNewMemberRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
class PacketNewMemberRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'NEWMEM';
    }
    readBodyJson(body) {
        this.Chatlog = new chatlog_struct_1.ChatlogStruct();
        if (body['chatLog']) {
            this.Chatlog.fromJson(body['chatLog']);
        }
    }
}
exports.PacketNewMemberRes = PacketNewMemberRes;
//# sourceMappingURL=packet-new-member.js.map