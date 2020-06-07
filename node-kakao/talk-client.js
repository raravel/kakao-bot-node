"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkClient = void 0;
const network_manager_1 = require("./network/network-manager");
const login_access_data_struct_1 = require("./talk/struct/login-access-data-struct");
const kakao_api_1 = require("./kakao-api");
const chat_user_1 = require("./talk/user/chat-user");
const events_1 = require("events");
const client_settings_struct_1 = require("./talk/struct/client-settings-struct");
const user_manager_1 = require("./talk/user/user-manager");
const channel_manager_1 = require("./talk/channel/channel-manager");
const chat_manager_1 = require("./talk/chat/chat-manager");
const json_util_1 = require("./util/json-util");
const open_chat_manager_1 = require("./talk/open/open-chat-manager");
class TalkClient extends events_1.EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.networkManager = new network_manager_1.NetworkManager(this);
        this.channelManager = new channel_manager_1.ChannelManager(this);
        this.userManager = new user_manager_1.UserManager(this);
        this.chatManager = new chat_manager_1.ChatManager(this);
        this.openChatManager = new open_chat_manager_1.OpenChatManager(this);
        this.clientUser = new chat_user_1.ClientChatUser(this, new login_access_data_struct_1.LoginAccessDataStruct(), new client_settings_struct_1.ClientSettingsStruct(), -1);
    }
    get Name() {
        return this.name;
    }
    get NetworkManager() {
        return this.networkManager;
    }
    get ChannelManager() {
        return this.channelManager;
    }
    get UserManager() {
        return this.userManager;
    }
    get ChatManager() {
        return this.chatManager;
    }
    get OpenChatManager() {
        return this.openChatManager;
    }
    get ClientUser() {
        return this.clientUser;
    }
    get LocoLogon() {
        return this.networkManager.Logon;
    }
    async login(email, password, deviceUUID, forced = false) {
        if (this.LocoLogon) {
            throw new Error('Already logon to loco');
        }
        let loginAccessData = new login_access_data_struct_1.LoginAccessDataStruct();
        loginAccessData.fromJson(json_util_1.JsonUtil.parseLoseless(await kakao_api_1.KakaoAPI.requestLogin(email, password, deviceUUID, this.Name, forced)));
        let statusCode = loginAccessData.Status;
        if (statusCode !== 0) {
            throw statusCode;
        }
        let settings = new client_settings_struct_1.ClientSettingsStruct();
        settings.fromJson(json_util_1.JsonUtil.parseLoseless(await kakao_api_1.KakaoAPI.requestAccountSettings(loginAccessData.AccessToken, deviceUUID, 0)));
        if (settings.Status !== 0) {
            throw new Error(`more_settings.json ERR: ${settings.Status}`);
        }
        let loginRes = await this.networkManager.locoLogin(deviceUUID, this.clientUser.Id, loginAccessData.AccessToken);
        this.clientUser = new chat_user_1.ClientChatUser(this, loginAccessData, settings, loginRes.OpenChatToken);
        this.userManager.initalizeClient();
        this.channelManager.initalizeLoginData(loginRes.ChatDataList);
        await this.openChatManager.initOpenSession();
        this.emit('login', this.clientUser);
    }
    async logout() {
        return this.networkManager.logout();
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.TalkClient = TalkClient;
//# sourceMappingURL=talk-client.js.map