"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAccessDataStruct = exports.LoginStatusCode = void 0;
const bson_1 = require("bson");
const json_util_1 = require("../../util/json-util");
var LoginStatusCode;
(function (LoginStatusCode) {
    LoginStatusCode[LoginStatusCode["PASS"] = 0] = "PASS";
    LoginStatusCode[LoginStatusCode["VALIDATION_FAILED"] = -30] = "VALIDATION_FAILED";
    LoginStatusCode[LoginStatusCode["DEVICE_NOT_REGISTERED"] = -100] = "DEVICE_NOT_REGISTERED";
    LoginStatusCode[LoginStatusCode["DEVICE_LOGON_ANOTHER"] = -101] = "DEVICE_LOGON_ANOTHER";
    LoginStatusCode[LoginStatusCode["RESTRICTED"] = -997] = "RESTRICTED";
})(LoginStatusCode = exports.LoginStatusCode || (exports.LoginStatusCode = {}));
class LoginAccessDataStruct {
    constructor(Status = 0, StoryURL = '', UserId = bson_1.Long.ZERO, CountryISO = '', CountryCode = '0', AccountId = 0, LogonServerTime = 0, ResetUserData = false, AccessToken = '', RefreshToken = '', TokenType = '', AutoLoginEmail = '', DisplayAccountId = '', MainDevice = '', MainDeviceAppVersion = '') {
        this.Status = Status;
        this.StoryURL = StoryURL;
        this.UserId = UserId;
        this.CountryISO = CountryISO;
        this.CountryCode = CountryCode;
        this.AccountId = AccountId;
        this.LogonServerTime = LogonServerTime;
        this.ResetUserData = ResetUserData;
        this.AccessToken = AccessToken;
        this.RefreshToken = RefreshToken;
        this.TokenType = TokenType;
        this.AutoLoginEmail = AutoLoginEmail;
        this.DisplayAccountId = DisplayAccountId;
        this.MainDevice = MainDevice;
        this.MainDeviceAppVersion = MainDeviceAppVersion;
    }
    fromJson(data) {
        this.Status = data['status'];
        this.StoryURL = data['story_url'];
        this.UserId = json_util_1.JsonUtil.readLong(data['userId']),
            this.CountryISO = data['countryIso'],
            this.CountryCode = data['countryCode'],
            this.AccountId = data['accountId'],
            this.LogonServerTime = data['server_time'],
            this.ResetUserData = data['resetUserData'],
            this.AccessToken = data['access_token'],
            this.RefreshToken = data['refresh_token'],
            this.TokenType = data['token_type'],
            this.AutoLoginEmail = data['autoLoginAccountId'],
            this.DisplayAccountId = data['displayAccountId'],
            this.MainDevice = data['mainDeviceAgentName'],
            this.MainDeviceAppVersion = data['mainDeviceAppVersion'];
    }
    toJson() {
        return {
            'status': this.Status,
            'story_url': this.StoryURL,
            'userId': this.UserId,
            'countryIso': this.CountryISO,
            'countryCode': this.CountryCode,
            'accountId': this.AccountId,
            'server_time': this.LogonServerTime,
            'resetUserData': this.ResetUserData,
            'access_token': this.AccessToken,
            'refresh_token': this.RefreshToken,
            'token_type': this.TokenType,
            'autoLoginAccountId': this.AutoLoginEmail,
            'displayAccountId': this.DisplayAccountId,
            'mainDeviceAgentName': this.MainDevice,
            'mainDeviceAppVersion': this.MainDeviceAppVersion
        };
    }
}
exports.LoginAccessDataStruct = LoginAccessDataStruct;
//# sourceMappingURL=login-access-data-struct.js.map