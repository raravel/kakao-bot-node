"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMetaStruct = exports.ChannelMetaType = exports.ChatMetaStruct = exports.ChatInfoStruct = void 0;
const bson_1 = require("bson");
const channel_type_1 = require("../chat/channel-type");
const chatlog_struct_1 = require("./chatlog-struct");
const member_struct_1 = require("./member-struct");
const json_util_1 = require("../../util/json-util");
const os_1 = require("os");
class ChatInfoStruct {
    constructor(ChannelId = bson_1.Long.ZERO, Type = channel_type_1.ChannelType.GROUP, OpenLinkId = bson_1.Long.ZERO, OpenChatToken = -1, ActiveMemberCount = 0, NewMessageCount = 0, LastUpdatedAt = null, LastMessage = null, LastLogId = bson_1.Long.fromNumber(-1), LastSeenLogId = bson_1.Long.fromNumber(-1), LastChatLog = null, Metadata = new ChatMetaStruct(), ActiveMemberList = [], PushAlert = false, ChatMetaList = [], IsDirectChat = false) {
        this.ChannelId = ChannelId;
        this.Type = Type;
        this.OpenLinkId = OpenLinkId;
        this.OpenChatToken = OpenChatToken;
        this.ActiveMemberCount = ActiveMemberCount;
        this.NewMessageCount = NewMessageCount;
        this.LastUpdatedAt = LastUpdatedAt;
        this.LastMessage = LastMessage;
        this.LastLogId = LastLogId;
        this.LastSeenLogId = LastSeenLogId;
        this.LastChatLog = LastChatLog;
        this.Metadata = Metadata;
        this.ActiveMemberList = ActiveMemberList;
        this.PushAlert = PushAlert;
        this.ChatMetaList = ChatMetaList;
        this.IsDirectChat = IsDirectChat;
    }
    fromJson(rawJson) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawJson['chatId']);
        this.Type = rawJson['type'];
        this.ActiveMemberCount = rawJson['activeMembersCount'];
        this.NewMessageCount = rawJson['newMessageCount'];
        this.LastUpdatedAt = rawJson['lastUpdatedAt'];
        this.LastMessage = rawJson['lastMessage'];
        this.LastLogId = json_util_1.JsonUtil.readLong(rawJson['lastLogId']);
        this.LastSeenLogId = json_util_1.JsonUtil.readLong(rawJson['lastSeenLogId']);
        this.LastChatLog = null;
        if (rawJson['lastChatLog']) {
            this.LastChatLog = new chatlog_struct_1.ChatlogStruct();
            this.LastChatLog.fromJson(rawJson['lastChatLog']);
        }
        this.OpenLinkId = bson_1.Long.ZERO;
        if (rawJson['li']) {
            this.OpenLinkId = json_util_1.JsonUtil.readLong(rawJson['li']);
        }
        this.OpenChatToken = -1;
        if (rawJson['otk']) {
            this.OpenChatToken = rawJson['otk'];
        }
        if (rawJson['meta']) {
            this.Metadata.fromJson(rawJson['meta']);
        }
        this.ActiveMemberList.length = 0;
        if (rawJson['displayMembers']) {
            let list = rawJson['displayMembers'];
            for (let rawMember of list) {
                let memberStruct = new member_struct_1.MemberStruct();
                memberStruct.fromJson(rawMember);
                this.ActiveMemberList.push(memberStruct);
            }
        }
        this.ChatMetaList = [];
        if (rawJson['chatMetas']) {
            let list = rawJson['chatMetas'];
            for (let rawMeta of list) {
                let infoMeta = new ChannelMetaStruct();
                infoMeta.fromJson(rawMeta);
                this.ChatMetaList.push(infoMeta);
            }
        }
        this.PushAlert = rawJson['pushAlert'];
        this.IsDirectChat = rawJson['directChat'];
    }
    toJson() {
        let obj = {
            'chatId': this.ChannelId,
            'type': os_1.type,
            'activeMembersCount': this.ActiveMemberCount,
            'newMessageCount': this.NewMessageCount,
            'lastUpdatedAt': this.LastUpdatedAt,
            'lastMessage': this.LastMessage,
            'lastLogId': this.LastLogId,
            'lastSeenLogId': this.LastSeenLogId,
            'lastChatLog': null,
            'meta': null,
            'pushAlert': this.PushAlert,
            'directChat': this.IsDirectChat
        };
        if (this.LastChatLog) {
            obj['lastChatLog'] = this.LastChatLog.toJson();
        }
        obj['meta'] = this.Metadata;
        let displayMemList = [];
        for (let memberStruct of this.ActiveMemberList) {
            displayMemList.push(memberStruct.toJson());
        }
        obj['displayMembers'] = displayMemList;
        if (this.OpenLinkId !== bson_1.Long.ZERO) {
            obj['li'] = this.OpenLinkId;
        }
        this.OpenChatToken = -1;
        if (this.OpenChatToken !== -1) {
            obj['otk'] = this.OpenChatToken;
        }
        let chatMetaList = [];
        for (let chatInfoMetaStruct of this.ChatMetaList) {
            chatMetaList.push(chatInfoMetaStruct.toJson());
        }
        obj['chatMetas'] = chatMetaList;
        return obj;
    }
}
exports.ChatInfoStruct = ChatInfoStruct;
class ChatMetaStruct {
    constructor(FullImageURL = '', ImageURL = '', Name = '', Favorite = false) {
        this.FullImageURL = FullImageURL;
        this.ImageURL = ImageURL;
        this.Name = Name;
        this.Favorite = Favorite;
    }
    toJson() {
        return {
            'imageUrl': this.ImageURL,
            'fullImageUrl': this.FullImageURL,
            'name': this.Name,
            'favorite': this.Favorite
        };
    }
    fromJson(rawJson) {
        this.ImageURL = rawJson['imageUrl'];
        this.FullImageURL = rawJson['fullImageUrl'];
        this.Name = rawJson['name'];
        this.Favorite = rawJson['favorite'];
    }
}
exports.ChatMetaStruct = ChatMetaStruct;
var ChannelMetaType;
(function (ChannelMetaType) {
    ChannelMetaType[ChannelMetaType["NOTICE"] = 1] = "NOTICE";
    ChannelMetaType[ChannelMetaType["GROUP"] = 2] = "GROUP";
    ChannelMetaType[ChannelMetaType["TITLE"] = 3] = "TITLE";
    ChannelMetaType[ChannelMetaType["PROFILE"] = 4] = "PROFILE";
    ChannelMetaType[ChannelMetaType["TV"] = 5] = "TV";
    ChannelMetaType[ChannelMetaType["PRIVILEGE"] = 6] = "PRIVILEGE";
    ChannelMetaType[ChannelMetaType["TV_LIVE"] = 7] = "TV_LIVE";
    ChannelMetaType[ChannelMetaType["PLUS_BACKGROUND"] = 8] = "PLUS_BACKGROUND";
    ChannelMetaType[ChannelMetaType["LIVE_TALK_INFO"] = 11] = "LIVE_TALK_INFO";
    ChannelMetaType[ChannelMetaType["LIVE_TALK_COUNT"] = 12] = "LIVE_TALK_COUNT";
})(ChannelMetaType = exports.ChannelMetaType || (exports.ChannelMetaType = {}));
class ChannelMetaStruct {
    constructor(Type = 0, Revision = bson_1.Long.ZERO, AuthorId = bson_1.Long.ZERO, Content = '', UpdatedAt = -1) {
        this.Type = Type;
        this.Revision = Revision;
        this.AuthorId = AuthorId;
        this.Content = Content;
        this.UpdatedAt = UpdatedAt;
    }
    toJson() {
        return {
            'type': this.Type,
            'revision': this.Revision,
            'authorId': this.AuthorId,
            'content': this.Content,
            'updateAt': this.UpdatedAt
        };
    }
    fromJson(rawJson) {
        this.Type = rawJson['type'];
        this.Revision = json_util_1.JsonUtil.readLong(rawJson['revision']);
        this.AuthorId = json_util_1.JsonUtil.readLong(rawJson['authorId']);
        this.Content = rawJson['content'];
        this.UpdatedAt = rawJson['updatedAt'];
    }
}
exports.ChannelMetaStruct = ChannelMetaStruct;
//# sourceMappingURL=chat-info-struct.js.map