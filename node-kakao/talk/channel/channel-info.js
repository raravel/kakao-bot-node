"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenChannelInfo = exports.ChannelInfo = void 0;
const chat_user_1 = require("../user/chat-user");
const chat_info_struct_1 = require("../struct/chat-info-struct");
const bson_1 = require("bson");
const open_link_struct_1 = require("../struct/open-link-struct");
const open_link_type_1 = require("../open/open-link-type");
class ChannelInfo {
    constructor(channel) {
        this.channel = channel;
        this.lastInfoUpdated = -1;
        this.userInfoMap = new Map();
        this.roomImageURL = '';
        this.roomFullImageURL = '';
        this.name = '';
        this.isFavorite = false;
        this.chatmetaList = [];
        this.isDirectChan = false;
        this.pendingInfoReq = this.pendingUserInfoReq = null;
        this.clientUserInfo = new chat_user_1.UserInfo(this.channel.Client.ClientUser);
    }
    get Channel() {
        return this.channel;
    }
    get Name() {
        return this.name;
    }
    get RoomImageURL() {
        return this.roomImageURL;
    }
    get RoomFullImageURL() {
        return this.roomFullImageURL;
    }
    get IsFavorite() {
        return this.isFavorite;
    }
    get RoomType() {
        return this.channel.Type;
    }
    get IsDirectChan() {
        return this.isDirectChan;
    }
    get LastInfoUpdated() {
        return this.lastInfoUpdated;
    }
    get UserIdList() {
        return Array.from(this.userInfoMap.keys()).map(strLong => bson_1.Long.fromString(strLong));
    }
    get ChatMetaList() {
        return this.chatmetaList;
    }
    hasUserInfo(id) {
        return this.userInfoMap.has(id.toString()) || this.Channel.Client.ClientUser.Id.equals(id);
    }
    get ClientUserInfo() {
        return this.clientUserInfo;
    }
    getUserInfo(user) {
        return this.getUserInfoId(user.Id);
    }
    getUserInfoId(id) {
        if (this.clientUserInfo.User.Id.equals(id)) {
            return this.ClientUserInfo;
        }
        if (!this.hasUserInfo(id)) {
            return null;
        }
        return this.userInfoMap.get(id.toString());
    }
    async addUserInfo(userId) {
        if (this.hasUserInfo(userId) || this.channel.Client.ClientUser.Id.equals(userId)) {
            throw new Error('This user already joined');
        }
        this.initUserInfo((await this.channel.Client.UserManager.requestSpecificMemberInfo(this.channel.Id, [userId]))[0]);
    }
    removeUserInfo(id) {
        if (this.channel.Client.ClientUser.Id.equals(id)) {
            throw new Error('Client user cannot be removed');
        }
        return this.userInfoMap.delete(id.toString());
    }
    updateFromStruct(chatinfoStruct) {
        this.isDirectChan = chatinfoStruct.IsDirectChat;
        this.chatmetaList = chatinfoStruct.ChatMetaList;
        for (let meta of this.chatmetaList) {
            if (meta.Type === chat_info_struct_1.ChannelMetaType.TITLE) {
                this.updateRoomName(meta.Content);
            }
        }
        this.roomImageURL = chatinfoStruct.Metadata.ImageURL;
        this.roomFullImageURL = chatinfoStruct.Metadata.FullImageURL;
        this.isFavorite = chatinfoStruct.Metadata.Favorite;
        this.lastInfoUpdated = Date.now();
    }
    updateRoomName(name) {
        this.name = name;
    }
    initUserInfo(memberStruct) {
        let info = new chat_user_1.UserInfo(this.channel.Client.UserManager.get(memberStruct.UserId));
        info.updateFromStruct(memberStruct);
        this.userInfoMap.set(memberStruct.UserId.toString(), info);
    }
    async updateInfo() {
        if (this.pendingInfoReq)
            return this.pendingInfoReq;
        let resolver;
        this.pendingInfoReq = new Promise((resolve, reject) => resolver = resolve);
        await this.updateMemberInfo();
        await this.updateChannelInfo();
        resolver();
    }
    updateFromChatOnRoom(res) {
        for (let memberStruct of res.MemberList) {
            if (this.clientUserInfo.User.Id.equals(memberStruct.UserId)) {
                this.clientUserInfo.updateFromStruct(memberStruct);
                continue;
            }
            this.initUserInfo(memberStruct);
        }
    }
    async updateChannelInfo() {
        let info = await this.Channel.Client.ChannelManager.requestChannelInfo(this.channel.Id);
        try {
            this.updateFromStruct(info);
        }
        catch (e) {
            this.updateFromStruct(new chat_info_struct_1.ChatInfoStruct());
        }
    }
    async updateMemberInfo() {
        if (this.pendingUserInfoReq)
            return this.pendingUserInfoReq;
        let resolver;
        this.pendingUserInfoReq = new Promise((resolve, reject) => resolver = resolve);
        this.userInfoMap.clear();
        let res = await this.channel.Client.ChannelManager.requestChatOnRoom(this.channel);
        this.updateFromChatOnRoom(res);
        resolver();
    }
}
exports.ChannelInfo = ChannelInfo;
class OpenChannelInfo extends ChannelInfo {
    constructor() {
        super(...arguments);
        this.linkInfo = new open_link_struct_1.OpenLinkStruct();
        this.memberTypeMap = new Map();
    }
    get Channel() {
        return super.Channel;
    }
    get CoverURL() {
        return this.linkInfo.CoverURL;
    }
    get LinkURL() {
        return this.linkInfo.LinkURL;
    }
    get LinkOwner() {
        return this.Channel.Client.UserManager.get(this.linkInfo.Owner.UserId);
    }
    canManageChannel(user) {
        return this.canManageChannelId(user.Id);
    }
    canManageChannelId(userId) {
        return this.isManagerId(userId) || userId.equals(this.LinkOwner.Id);
    }
    isManager(user) {
        return this.isManagerId(user.Id);
    }
    isManagerId(userId) {
        return this.getMemberTypeId(userId) === open_link_type_1.OpenMemberType.MANAGER;
    }
    initUserInfo(memberStruct) {
        super.initUserInfo(memberStruct);
        this.updateMemberType(memberStruct.UserId, memberStruct.OpenChatMemberType);
    }
    updateMemberType(userId, memberType) {
        if (!this.hasUserInfo(userId))
            return;
        this.memberTypeMap.set(userId.toString(), memberType);
    }
    getMemberType(user) {
        return this.getMemberTypeId(user.Id);
    }
    getMemberTypeId(userId) {
        if (!this.hasUserInfo(userId))
            open_link_type_1.OpenMemberType.NONE;
        return this.memberTypeMap.get(userId.toString());
    }
    async updateChannelInfo() {
        await super.updateChannelInfo();
        let openLinkInfo = await this.Channel.Client.OpenChatManager.get(this.Channel.LinkId);
        this.updateRoomName(openLinkInfo.LinkName);
        this.linkInfo = openLinkInfo;
    }
    async updateFromChatOnRoom(res) {
        super.updateFromChatOnRoom(res);
        if (res.ClientOpenProfile) {
            this.ClientUserInfo.updateFromOpenStruct(res.ClientOpenProfile);
            this.updateMemberType(this.ClientUserInfo.User.Id, res.ClientOpenProfile.MemberType);
        }
        else {
            let linkInfo = await this.Channel.Client.OpenChatManager.get(this.Channel.LinkId);
            if (linkInfo.Owner.UserId.equals(this.ClientUserInfo.User.Id))
                this.ClientUserInfo.updateFromOpenStruct(linkInfo.Owner);
        }
    }
}
exports.OpenChannelInfo = OpenChannelInfo;
//# sourceMappingURL=channel-info.js.map