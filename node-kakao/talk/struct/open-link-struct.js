"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMemberStruct = exports.OpenLinkStruct = void 0;
const bson_1 = require("bson");
const json_util_1 = require("../../util/json-util");
const open_link_type_1 = require("../open/open-link-type");
class OpenLinkStruct {
    constructor(LinkId = bson_1.Long.ZERO, OpenToken = 0, LinkName = '', LinkURL = '', LinkType = open_link_type_1.OpenLinkType.PROFILE, Owner = new OpenMemberStruct(), Description = '', CoverURL = '') {
        this.LinkId = LinkId;
        this.OpenToken = OpenToken;
        this.LinkName = LinkName;
        this.LinkURL = LinkURL;
        this.LinkType = LinkType;
        this.Owner = Owner;
        this.Description = Description;
        this.CoverURL = CoverURL;
    }
    fromJson(rawData) {
        this.LinkId = json_util_1.JsonUtil.readLong(rawData['li']);
        this.OpenToken = rawData['otk'];
        this.LinkName = rawData['ln'];
        this.LinkURL = rawData['lu'];
        this.LinkType = rawData['lt'];
        this.Owner.fromJson(rawData['olu']);
        this.Description = rawData['desc'];
        this.CoverURL = rawData['liu'];
    }
    toJson() {
        let obj = {
            'li': this.LinkId,
            'otk': this.OpenToken,
            'ln': this.LinkName,
            'lu': this.LinkURL,
            'lt': this.LinkType,
            'olu': this.Owner.toJson(),
            'desc': this.Description,
            'liu': this.CoverURL
        };
        return obj;
    }
}
exports.OpenLinkStruct = OpenLinkStruct;
class OpenMemberStruct {
    constructor(UserId = bson_1.Long.ZERO, NickName = '', ProfileImageUrl = '', OriginalProfileImageUrl = '', FullProfileImageUrl = '', MemberType = 0, OpenChatToken = 0) {
        this.UserId = UserId;
        this.NickName = NickName;
        this.ProfileImageUrl = ProfileImageUrl;
        this.OriginalProfileImageUrl = OriginalProfileImageUrl;
        this.FullProfileImageUrl = FullProfileImageUrl;
        this.MemberType = MemberType;
        this.OpenChatToken = OpenChatToken;
    }
    fromJson(rawData) {
        this.UserId = json_util_1.JsonUtil.readLong(rawData['userId']);
        this.NickName = rawData['nn'];
        this.ProfileImageUrl = rawData['pi'] || rawData['profileImageUrl'] || '';
        this.OriginalProfileImageUrl = rawData['opi'] || rawData['originalProfileImageUrl'] || '';
        this.FullProfileImageUrl = rawData['fpi'] || rawData['fullProfileImageUrl'] || '';
        this.MemberType = rawData['lmt'];
        this.OpenChatToken = rawData['opt'];
    }
    toJson() {
        let obj = {
            'userId': this.UserId,
            'nn': this.NickName,
            'pi': this.ProfileImageUrl,
            'opi': this.OriginalProfileImageUrl,
            'fpi': this.FullProfileImageUrl,
            'lmt': this.MemberType,
            'opt': this.OpenChatToken
        };
        return obj;
    }
}
exports.OpenMemberStruct = OpenMemberStruct;
//# sourceMappingURL=open-link-struct.js.map