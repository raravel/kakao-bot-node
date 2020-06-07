"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketLeftRes = exports.PacketLeaveRes = exports.PacketLeaveReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const json_util_1 = require("../util/json-util");
const bson_1 = require("bson");
class PacketLeaveReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO, Block = false) {
        super();
        this.ChannelId = ChannelId;
        this.Block = Block;
    }
    get PacketName() {
        return 'LEAVE';
    }
    toBodyJson() {
        return {
            'chatId': json_util_1.JsonUtil.readLong(this.ChannelId),
            'block': this.Block
        };
    }
}
exports.PacketLeaveReq = PacketLeaveReq;
class PacketLeaveRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, LastTokenId = bson_1.Long.ZERO) {
        super(status);
        this.LastTokenId = LastTokenId;
    }
    get PacketName() {
        return 'LEAVE';
    }
    readBodyJson(rawData) {
        this.LastTokenId = json_util_1.JsonUtil.readLong(rawData['lastTokenId']);
    }
}
exports.PacketLeaveRes = PacketLeaveRes;
class PacketLeftRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, LastTokenId = bson_1.Long.ZERO) {
        super(status);
        this.ChannelId = ChannelId;
        this.LastTokenId = LastTokenId;
    }
    get PacketName() {
        return 'LEFT';
    }
    readBodyJson(body) {
        this.ChannelId = json_util_1.JsonUtil.readLong(body['chatId']);
        this.LastTokenId = json_util_1.JsonUtil.readLong(body['lastTokenId']);
    }
}
exports.PacketLeftRes = PacketLeftRes;
//# sourceMappingURL=packet-leave.js.map