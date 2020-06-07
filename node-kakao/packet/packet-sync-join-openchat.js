"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSyncJoinOpenchatRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chat_info_struct_1 = require("../talk/struct/chat-info-struct");
const json_util_1 = require("../util/json-util");
class PacketSyncJoinOpenchatRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, OpenId = bson_1.Long.ZERO, ChatInfo = null) {
        super(status);
        this.OpenId = OpenId;
        this.ChatInfo = ChatInfo;
    }
    get PacketName() {
        return 'SYNCLINKCR';
    }
    readBodyJson(rawBody) {
        this.OpenId = json_util_1.JsonUtil.readLong(rawBody['ol']);
        if (rawBody['chatRoom']) {
            this.ChatInfo = new chat_info_struct_1.ChatInfoStruct();
            this.ChatInfo.fromJson(rawBody['chatRoom']);
        }
        else {
            this.ChatInfo = null;
        }
    }
}
exports.PacketSyncJoinOpenchatRes = PacketSyncJoinOpenchatRes;
//# sourceMappingURL=packet-sync-join-openchat.js.map