"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSyncDeleteMessageRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
class PacketSyncDeleteMessageRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, TraceId = 0, Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.TraceId = TraceId;
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'SYNCDLMSG';
    }
    readBodyJson(rawData) {
        this.TraceId = rawData['traceId'];
        if (rawData['chatLog'])
            this.Chatlog.fromJson(rawData['chatLog']);
    }
}
exports.PacketSyncDeleteMessageRes = PacketSyncDeleteMessageRes;
//# sourceMappingURL=packet-sync-delete-message.js.map