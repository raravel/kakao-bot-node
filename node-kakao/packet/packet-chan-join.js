"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketChanJoinRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
const __1 = require("..");
const json_util_1 = require("../util/json-util");
class PacketChanJoinRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = __1.Long.ZERO, Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.ChannelId = ChannelId;
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'SYNCJOIN';
    }
    readBodyJson(rawJson) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawJson['c']);
        if (rawJson['chatLog']) {
            this.Chatlog.fromJson(rawJson['chatLog']);
        }
    }
}
exports.PacketChanJoinRes = PacketChanJoinRes;
//# sourceMappingURL=packet-chan-join.js.map