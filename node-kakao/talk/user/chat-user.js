"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUserInfo = exports.ClientChatUser = exports.UserInfo = exports.ChatUser = void 0;
const bson_1 = require("bson");
const user_type_1 = require("./user-type");
const events_1 = require("events");
class ChatUser extends events_1.EventEmitter {
    constructor(client, userId, nickname = '') {
        super();
        this.client = client;
        this.id = userId;
        this.nickname = nickname;
    }
    get Client() {
        return this.client;
    }
    get Id() {
        return this.id;
    }
    get Nickname() {
        return this.nickname;
    }
    updateNickname(nickname) {
        if (this.nickname !== nickname)
            this.nickname = nickname;
    }
    isClientUser() {
        return false;
    }
    async createDM() {
        return this.client.ChannelManager.createChannel([this]);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.ChatUser = ChatUser;
class UserInfo {
    constructor(user) {
        this.user = user;
        this.accountId = 0;
        this.profileImageURL = '';
        this.fullProfileImageURL = '';
        this.originalProfileImageURL = '';
        this.lastInfoCache = -1;
        this.userType = user_type_1.UserType.Undefined;
    }
    get User() {
        return this.user;
    }
    get AccountId() {
        return this.accountId;
    }
    get ProfileImageURL() {
        return this.profileImageURL;
    }
    get FullProfileImageURL() {
        return this.fullProfileImageURL;
    }
    get OriginalProfileImageURL() {
        return this.originalProfileImageURL;
    }
    get LastInfoCache() {
        return this.lastInfoCache;
    }
    get ProfileLinkId() {
        return this.profileLinkId;
    }
    get OpenProfileToken() {
        return this.openProfileToken;
    }
    get UserType() {
        return this.userType;
    }
    isOpenUser() {
        if (this.openProfileToken)
            return true;
        return false;
    }
    hasOpenProfile() {
        if (this.profileLinkId)
            return true;
        return false;
    }
    update(memberStruct) {
        this.updateFromStruct(memberStruct);
    }
    updateFromStruct(memberStruct) {
        this.accountId = memberStruct.AccountId;
        this.user.updateNickname(memberStruct.NickName);
        this.profileImageURL = memberStruct.ProfileImageUrl || '';
        this.fullProfileImageURL = memberStruct.FullProfileImageUrl || '';
        this.originalProfileImageURL = memberStruct.OriginalProfileImageUrl || '';
        if (memberStruct.OpenProfileToken !== 0) {
            this.openProfileToken = memberStruct.OpenProfileToken;
        }
        if (memberStruct.ProfileLinkId !== bson_1.Long.ZERO) {
            this.profileLinkId = memberStruct.ProfileLinkId;
        }
        this.userType = memberStruct.Type;
    }
    updateFromOpenStruct(memberStruct) {
        this.user.updateNickname(memberStruct.NickName);
        this.profileImageURL = memberStruct.ProfileImageUrl || '';
        this.fullProfileImageURL = memberStruct.FullProfileImageUrl || '';
        this.originalProfileImageURL = memberStruct.OriginalProfileImageUrl || '';
        this.openProfileToken = memberStruct.OpenChatToken;
    }
}
exports.UserInfo = UserInfo;
class ClientChatUser extends ChatUser {
    constructor(client, clientAccessData, settings, mainOpenToken) {
        super(client, clientAccessData.UserId);
        this.mainOpenToken = mainOpenToken;
        this.mainUserInfo = new ClientUserInfo(clientAccessData, settings);
    }
    get MainUserInfo() {
        return this.mainUserInfo;
    }
    get MainOpenToken() {
        return this.mainOpenToken;
    }
    isClientUser() {
        return true;
    }
}
exports.ClientChatUser = ClientChatUser;
class ClientUserInfo {
    constructor(clientAccessData, settings) {
        this.clientAccessData = clientAccessData;
        this.settings = settings;
    }
    get AccountId() {
        return this.clientAccessData.AccountId;
    }
    get ProfileImageURL() {
        return this.settings.ProfileImageURL;
    }
    get FullProfileImageURL() {
        return this.settings.FullProfileImageURL;
    }
    get OriginalProfileImageURL() {
        return this.settings.OriginalProfileImageURL;
    }
    get BackgroundImageURL() {
        return this.settings.BackgroundImageURL;
    }
    get OriginalBackgroundImageURL() {
        return this.settings.OriginalBackgroundImageURL;
    }
    get LastInfoCache() {
        return Date.now();
    }
    get KakaoStoryURL() {
        return this.clientAccessData.StoryURL;
    }
    get LogonTime() {
        return this.clientAccessData.LogonServerTime;
    }
    get MainDeviceName() {
        return this.clientAccessData.MainDevice;
    }
    get MainDeviceAppVer() {
        return this.clientAccessData.MainDeviceAppVersion;
    }
    update(memberStruct) {
    }
    updateFromStruct(memberStruct) {
    }
}
exports.ClientUserInfo = ClientUserInfo;
//# sourceMappingURL=chat-user.js.map