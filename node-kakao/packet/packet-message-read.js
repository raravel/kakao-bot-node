"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMessageReadRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const json_util_1 = require("../util/json-util");
const bson_1 = require("bson");
class PacketMessageReadRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, ReaderId = bson_1.Long.ZERO, Watermark = bson_1.Long.ZERO) {
        super(status);
        this.ChannelId = ChannelId;
        this.ReaderId = ReaderId;
        this.Watermark = Watermark;
    }
    get PacketName() {
        return 'DECUNREAD';
    }
    readBodyJson(body) {
        this.ChannelId = json_util_1.JsonUtil.readLong(body['chatId']);
        this.ReaderId = json_util_1.JsonUtil.readLong(body['userId']);
        this.Watermark = json_util_1.JsonUtil.readLong(body['watermark']);
    }
}
exports.PacketMessageReadRes = PacketMessageReadRes;
//# sourceMappingURL=packet-message-read.js.map