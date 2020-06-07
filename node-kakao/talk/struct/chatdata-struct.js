"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDataMetaStruct = exports.ChatDataStruct = void 0;
const channel_type_1 = require("../chat/channel-type");
const json_util_1 = require("../../util/json-util");
const bson_1 = require("bson");
class ChatDataStruct {
    constructor(ChannelId = bson_1.Long.ZERO, Type = channel_type_1.ChannelType.GROUP, OpenLinkId = bson_1.Long.ZERO, OpenChatToken = -1, MemberCount = 0, PushAlert = false, Metadata = new ChatDataMetaStruct()) {
        this.ChannelId = ChannelId;
        this.Type = Type;
        this.OpenLinkId = OpenLinkId;
        this.OpenChatToken = OpenChatToken;
        this.MemberCount = MemberCount;
        this.PushAlert = PushAlert;
        this.Metadata = Metadata;
    }
    fromJson(rawData) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        this.Type = rawData['t'];
        this.MemberCount = rawData['a'];
        this.PushAlert = rawData['p'];
        if (rawData['m']) {
            this.Metadata.fromJson(rawData['m']);
        }
        this.OpenLinkId = bson_1.Long.ZERO;
        if (rawData['li']) {
            this.OpenLinkId = json_util_1.JsonUtil.readLong(rawData['li']);
        }
        this.OpenChatToken = -1;
        if (rawData['otk']) {
            this.OpenChatToken = rawData['otk'];
        }
    }
    toJson() {
        let obj = {
            'c': this.ChannelId,
            't': this.Type,
            'a': this.MemberCount,
            'p': this.PushAlert,
            'm': null
        };
        if (this.Metadata) {
            obj['m'] = this.Metadata.toJson();
        }
        if (this.OpenLinkId !== bson_1.Long.ZERO) {
            obj['li'] = this.OpenLinkId;
        }
        this.OpenChatToken = -1;
        if (this.OpenChatToken !== -1) {
            obj['otk'] = this.OpenChatToken;
        }
        return obj;
    }
}
exports.ChatDataStruct = ChatDataStruct;
class ChatDataMetaStruct {
    constructor(ImageURL = '', FullImageURL = '', Name = '', Favorite = false) {
        this.ImageURL = ImageURL;
        this.FullImageURL = FullImageURL;
        this.Name = Name;
        this.Favorite = Favorite;
    }
    fromJson(rawData) {
        let data = new ChatDataMetaStruct();
        data.ImageURL = rawData['imageUrl'];
        data.FullImageURL = rawData['fullImageUrl'];
        data.Name = rawData['name'];
        data.Favorite = rawData['favorite'];
    }
    toJson() {
        return {
            'imageUrl': this.ImageURL,
            'fullImageUrl': this.FullImageURL,
            'name': this.Name,
            'favorite': this.Favorite
        };
    }
}
exports.ChatDataMetaStruct = ChatDataMetaStruct;
//# sourceMappingURL=chatdata-struct.js.map