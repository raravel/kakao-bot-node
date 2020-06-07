"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSyncProfileRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const open_link_struct_1 = require("../talk/struct/open-link-struct");
const json_util_1 = require("../util/json-util");
class PacketSyncProfileRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, LinkId = bson_1.Long.ZERO, OpenMember = new open_link_struct_1.OpenMemberStruct()) {
        super(status);
        this.ChannelId = ChannelId;
        this.LinkId = LinkId;
        this.OpenMember = OpenMember;
    }
    get PacketName() {
        return 'SYNCLINKPF';
    }
    readBodyJson(rawData) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        this.LinkId = json_util_1.JsonUtil.readLong(rawData['li']);
        if (rawData['olu']) {
            this.OpenMember.fromJson(rawData['olu']);
        }
    }
}
exports.PacketSyncProfileRes = PacketSyncProfileRes;
//# sourceMappingURL=packet-sync-profile.js.map