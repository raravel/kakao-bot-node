"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketGetMetasRes = exports.PacketGetMetasReq = exports.PacketGetMetaRes = exports.PacketGetMetaReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const __1 = require("..");
const json_util_1 = require("../util/json-util");
class PacketGetMetaReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = __1.Long.ZERO, MetaTypeList = []) {
        super();
        this.ChannelId = ChannelId;
        this.MetaTypeList = MetaTypeList;
    }
    get PacketName() {
        return 'GETMETA';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId,
            'types': this.MetaTypeList
        };
    }
}
exports.PacketGetMetaReq = PacketGetMetaReq;
class PacketGetMetaRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = __1.Long.ZERO, MetaList = []) {
        super(status);
        this.ChannelId = ChannelId;
        this.MetaList = MetaList;
    }
    get PacketName() {
        return 'GETMETA';
    }
    readBodyJson(rawJson) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawJson['chatId']);
        this.MetaList = [];
        if (rawJson['metas']) {
            let list = rawJson['metas'];
            for (let rawMeta of list) {
            }
        }
    }
}
exports.PacketGetMetaRes = PacketGetMetaRes;
class PacketGetMetasReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelList = []) {
        super();
        this.ChannelList = ChannelList;
    }
    get PacketName() {
        return 'GETMETAS';
    }
    toBodyJson() {
        return {
            'cs': this.ChannelList
        };
    }
}
exports.PacketGetMetasReq = PacketGetMetasReq;
class PacketGetMetasRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelList = []) {
        super(status);
        this.ChannelList = ChannelList;
    }
    get PacketName() {
        return 'GETMETAS';
    }
    readBodyJson(rawJson) {
    }
}
exports.PacketGetMetasRes = PacketGetMetasRes;
//# sourceMappingURL=packet-get-meta.js.map