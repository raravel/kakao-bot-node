"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketUpdateOpenchatProfileRes = exports.PacketUpdateOpenchatProfileReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const open_link_struct_1 = require("../talk/struct/open-link-struct");
const open_link_type_1 = require("../talk/open/open-link-type");
class PacketUpdateOpenchatProfileReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkId = bson_1.Long.ZERO, ProfileType = open_link_type_1.OpenchatProfileType.MAIN, Nickname = '', ProfilePath = '', ProfileLinkId = bson_1.Long.ZERO) {
        super();
        this.LinkId = LinkId;
        this.ProfileType = ProfileType;
        this.Nickname = Nickname;
        this.ProfilePath = ProfilePath;
        this.ProfileLinkId = ProfileLinkId;
    }
    get PacketName() {
        return 'UPLINKPROF';
    }
    toBodyJson() {
        let obj = {
            'li': this.LinkId,
            'ptp': this.ProfileType
        };
        if (this.ProfileType === open_link_type_1.OpenchatProfileType.KAKAO_ANON) {
            if (this.Nickname !== '')
                obj['nn'] = this.Nickname;
            if (this.ProfilePath !== '')
                obj['pp'] = this.ProfilePath;
        }
        else if (this.ProfileType === open_link_type_1.OpenchatProfileType.OPEN_PROFILE) {
            obj['pli'] = this.ProfileLinkId;
        }
        return obj;
    }
}
exports.PacketUpdateOpenchatProfileReq = PacketUpdateOpenchatProfileReq;
class PacketUpdateOpenchatProfileRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, UpdatedProfile = new open_link_struct_1.OpenMemberStruct()) {
        super(status);
        this.UpdatedProfile = UpdatedProfile;
    }
    get PacketName() {
        return 'UPLINKPROF';
    }
    readBodyJson(rawData) {
        if (rawData['olu']) {
            this.UpdatedProfile.fromJson(rawData['olu']);
        }
    }
}
exports.PacketUpdateOpenchatProfileRes = PacketUpdateOpenchatProfileRes;
//# sourceMappingURL=packet-update-openchat-profile.js.map