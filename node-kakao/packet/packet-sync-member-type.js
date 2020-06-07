"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSyncMemberTypeRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const __1 = require("..");
const json_util_1 = require("../util/json-util");
class PacketSyncMemberTypeRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, LinkId = __1.Long.ZERO, ChannelId = __1.Long.ZERO, MemberIdList = [], MemberTypeList = []) {
        super(status);
        this.LinkId = LinkId;
        this.ChannelId = ChannelId;
        this.MemberIdList = MemberIdList;
        this.MemberTypeList = MemberTypeList;
    }
    get PacketName() {
        return 'SYNCMEMT';
    }
    readBodyJson(rawData) {
        this.LinkId = json_util_1.JsonUtil.readLong(rawData['li']);
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        if (rawData['mids']) {
            this.MemberIdList = rawData['mids'];
        }
        if (rawData['mts']) {
            this.MemberTypeList = rawData['mts'];
        }
    }
}
exports.PacketSyncMemberTypeRes = PacketSyncMemberTypeRes;
//# sourceMappingURL=packet-sync-member-type.js.map