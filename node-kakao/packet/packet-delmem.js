"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketDeleteMemberRes = void 0;
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
const loco_bson_packet_1 = require("./loco-bson-packet");
class PacketDeleteMemberRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'DELMEM';
    }
    readBodyJson(rawJson) {
        if (rawJson['chatLog']) {
            this.Chatlog.fromJson(rawJson['chatLog']);
        }
    }
}
exports.PacketDeleteMemberRes = PacketDeleteMemberRes;
//# sourceMappingURL=packet-delmem.js.map