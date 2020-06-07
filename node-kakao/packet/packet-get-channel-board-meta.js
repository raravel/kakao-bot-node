"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketGetMoimMetaRes = exports.PacketGetChannelBoardMetaReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const __1 = require("..");
const json_util_1 = require("../util/json-util");
class PacketGetChannelBoardMetaReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = __1.Long.ZERO, MetaTypeList = []) {
        super();
        this.ChannelId = ChannelId;
        this.MetaTypeList = MetaTypeList;
    }
    get PacketName() {
        return 'GETMOMETA';
    }
    toBodyJson() {
        return {
            'c': this.ChannelId,
            'ts': this.MetaTypeList
        };
    }
}
exports.PacketGetChannelBoardMetaReq = PacketGetChannelBoardMetaReq;
class PacketGetMoimMetaRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = __1.Long.ZERO) {
        super(status);
        this.ChannelId = ChannelId;
    }
    get PacketName() {
        return 'GETMOMETA';
    }
    readBodyJson(rawData) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        console.log(JSON.stringify(rawData));
    }
}
exports.PacketGetMoimMetaRes = PacketGetMoimMetaRes;
//# sourceMappingURL=packet-get-channel-board-meta.js.map