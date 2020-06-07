"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberStruct = void 0;
const user_type_1 = require("../user/user-type");
const json_util_1 = require("../../util/json-util");
const bson_1 = require("bson");
const open_link_type_1 = require("../open/open-link-type");
class MemberStruct {
    constructor(UserId = bson_1.Long.ZERO, NickName = '', ProfileImageUrl = '', OriginalProfileImageUrl = '', FullProfileImageUrl = '', Type = user_type_1.UserType.Undefined, AccountId = 0, LinkedService = '', StatusMessage = '', OpenProfileToken = 0, OpenChatMemberType = open_link_type_1.OpenMemberType.NONE, ProfileLinkId = bson_1.Long.ZERO) {
        this.UserId = UserId;
        this.NickName = NickName;
        this.ProfileImageUrl = ProfileImageUrl;
        this.OriginalProfileImageUrl = OriginalProfileImageUrl;
        this.FullProfileImageUrl = FullProfileImageUrl;
        this.Type = Type;
        this.AccountId = AccountId;
        this.LinkedService = LinkedService;
        this.StatusMessage = StatusMessage;
        this.OpenProfileToken = OpenProfileToken;
        this.OpenChatMemberType = OpenChatMemberType;
        this.ProfileLinkId = ProfileLinkId;
    }
    fromJson(rawData) {
        this.UserId = json_util_1.JsonUtil.readLong(rawData['userId']);
        this.NickName = rawData['nickName'];
        this.ProfileImageUrl = rawData['pi'] || rawData['profileImageUrl'] || '';
        this.OriginalProfileImageUrl = rawData['opi'] || rawData['originalProfileImageUrl'] || '';
        this.FullProfileImageUrl = rawData['fpi'] || rawData['fullProfileImageUrl'] || '';
        this.Type = rawData['type'] || user_type_1.UserType.Undefined;
        this.AccountId = rawData['accountId'] || 0;
        this.LinkedService = rawData['linkedService'] || '';
        this.StatusMessage = rawData['statusMessage'] || '';
        this.OpenProfileToken = rawData['opt'] || 0;
        this.ProfileLinkId = rawData['pli'] || bson_1.Long.ZERO;
        this.OpenChatMemberType = rawData['mt'] || open_link_type_1.OpenMemberType.NONE;
    }
    toJson() {
        let obj = {
            'userId': this.UserId,
            'nickName': this.NickName,
            'pi': this.ProfileImageUrl,
            'opi': this.OriginalProfileImageUrl,
            'fpi': this.FullProfileImageUrl,
            'type': this.Type,
            'accountId': this.AccountId
        };
        if (this.LinkedService !== '') {
            obj['linkedService'] = this.LinkedService;
        }
        if (this.StatusMessage !== '') {
            obj['statusMessage'] = this.StatusMessage;
        }
        if (this.OpenProfileToken !== 0) {
            obj['opt'] = this.OpenProfileToken;
            obj['mt'] = this.OpenChatMemberType;
        }
        if (this.ProfileLinkId !== bson_1.Long.ZERO) {
            obj['pli'] = this.ProfileLinkId;
        }
        return obj;
    }
}
exports.MemberStruct = MemberStruct;
//# sourceMappingURL=member-struct.js.map