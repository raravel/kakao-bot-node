"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSetMemTypeRes = exports.PacketSetMemTypeReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
const json_util_1 = require("../util/json-util");
class PacketSetMemTypeReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkId = bson_1.Long.ZERO, ChannelId = bson_1.Long.ZERO, MemberIdList = [], MemberTypeList = []) {
        super();
        this.LinkId = LinkId;
        this.ChannelId = ChannelId;
        this.MemberIdList = MemberIdList;
        this.MemberTypeList = MemberTypeList;
    }
    get PacketName() {
        return 'SETMEMTYPE';
    }
    toBodyJson() {
        return {
            'li': this.LinkId,
            'c': this.ChannelId,
            'mids': this.MemberIdList,
            'mts': this.MemberTypeList
        };
    }
}
exports.PacketSetMemTypeReq = PacketSetMemTypeReq;
class PacketSetMemTypeRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, LinkId = bson_1.Long.ZERO, ChannelId = bson_1.Long.ZERO, Chatlog = new chatlog_struct_1.ChatlogStruct(), MemberIdList = [], MemberTypeList = [], Unknown1 = []) {
        super(status);
        this.LinkId = LinkId;
        this.ChannelId = ChannelId;
        this.Chatlog = Chatlog;
        this.MemberIdList = MemberIdList;
        this.MemberTypeList = MemberTypeList;
        this.Unknown1 = Unknown1;
    }
    get PacketName() {
        return 'SETMEMTYPE';
    }
    readBodyJson(rawData) {
        this.LinkId = json_util_1.JsonUtil.readLong(rawData['li']);
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        if (rawData['mids']) {
            this.MemberIdList = rawData['mids'];
        }
        if (rawData['mts']) {
            this.MemberIdList = rawData['mts'];
        }
        if (rawData['chatLog']) {
            this.Chatlog.fromJson(rawData['chatLog']);
        }
        if (rawData['pvs']) {
            this.Unknown1 = [];
            for (let id of rawData['pvs']) {
                this.Unknown1.push(json_util_1.JsonUtil.readLong(id));
            }
        }
    }
}
exports.PacketSetMemTypeRes = PacketSetMemTypeRes;
//# sourceMappingURL=packet-set-mem-type.js.map