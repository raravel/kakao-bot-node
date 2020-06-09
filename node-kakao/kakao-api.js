"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoAPI = void 0;
const request = require("request-promise");
const querystring = require("querystring");
const Crypto = require("crypto");
class KakaoAPI {
    static get LocoPEMPublicKey() {
        return `-----BEGIN PUBLIC KEY-----\nMIIBIDANBgkqhkiG9w0BAQEFAAOCAQ0AMIIBCAKCAQEApElgRBx+g7sniYFW7LE8ivrwXShKTRFV8lXNItMXbN5QSC8vJ/cTSOTS619Xv5Zx7xXJIk4EKxtWesEGbgZpEUP2xQ+IeH9oz0JxayEMvvD1nVNAWgpWE4pociEoArsK7qY3YwXb1CiDHo9hojLv7djbo3cwXvlyMh4TUrX2RjCZPlVJxk/LVjzcl9ohJLkl3eoSrf0AE4kQ9mk3+raEhq5Dv+IDxKYX+fIytUWKmrQJusjtre9oVUX5sBOYZ0dzez/XapusEhUWImmB6mciVXfRXQ8IK4IH6vfNyxMSOTfLEhRYN2SMLzplAYFiMV536tLS3VmG5GJRdkpDubqPeQIBAw==\n-----END PUBLIC KEY-----`;
    }
    static get LocoPublicKey() {
        return {
            n: Buffer.from('a44960441c7e83bb27898156ecb13c8afaf05d284a4d1155f255cd22d3176cde50482f2f27f71348e4d2eb5f57bf9671ef15c9224e042b1b567ac1066e06691143f6c50f88787f68cf42716b210cbef0f59d53405a0a56138a6872212802bb0aeea6376305dbd428831e8f61a232efedd8dba377305ef972321e1352b5f64630993e5549c64fcb563cdc97da2124b925ddea12adfd00138910f66937fab68486ae43bfe203c4a617f9f232b5458a9ab409bac8edadef685545f9b013986747737b3fd76a9bac121516226981ea67225577d15d0f082b8207eaf7cdcb13123937cb12145837648c2f3a65018162315e77ead2d2dd5986e46251764a43b9ba8f79', 'hex'),
            e: 0x03
        };
    }
    static get Agent() {
        return 'win32';
    }
    static get Version() {
        return '3.1.1';
    }
    static get InternalAppVersion() {
        return `${this.Version}.${this.InternalAppSubVersion}`;
    }
    static get InternalAppSubVersion() {
        return '2441';
    }
    static get OSVersion() {
        return '10.0';
    }
    static get Language() {
        return 'ko';
    }
    static get AuthUserAgent() {
        return `KT/${KakaoAPI.Version} Wd/${KakaoAPI.OSVersion} ${KakaoAPI.Language}`;
    }
    static get AuthHeaderAgent() {
        return `${KakaoAPI.Agent}/${KakaoAPI.Version}/${KakaoAPI.Language}`;
    }
    static get InternalProtocol() {
        return 'https';
    }
    static get AccountInternalHost() {
        return 'ac-sb-talk.kakao.com';
    }
    static get InternalHost() {
        return 'sb-talk.kakao.com';
    }
    static get LocoEntry() {
        return 'booking-loco.kakao.com';
    }
    static get ProfileUploadHost() {
        return `up-p.talk.kakao.com`;
    }
    static get MediaUploadHost() {
        return `up-m.talk.kakao.com`;
    }
    static get VideoUploadHost() {
        return `up-v.talk.kakao.com`;
    }
    static get AudioUploadHost() {
        return `up-a.talk.kakao.com`;
    }
    static get GroupProfileUploadHost() {
        return `up-gp.talk.kakao.com`;
    }
    static get FileHost() {
        return 'dn.talk.kakao.com';
    }
    static get MediaFileHost() {
        return 'dn-m.talk.kakao.com';
    }
    static get AudioFileHost() {
        return 'dn-a.talk.kakao.com';
    }
    static get VideoFileHost() {
        return 'dn-v.talk.kakao.com';
    }
    static get MediaFileURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.MediaFileHost}`;
    }
    static get ProfileFileURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.MediaFileHost}`;
    }
    static get GroupProfileFileURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.MediaFileHost}`;
    }
    static get VideoFileURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.VideoFileHost}`;
    }
    static get AudioFileURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.AudioFileHost}`;
    }
    static get FileFileURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.FileHost}`;
    }
    static get MediaUploadURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.MediaUploadHost}/upload`;
    }
    static get ProfileUploadURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.ProfileUploadHost}/upload`;
    }
    static get GroupProfileUploadURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.GroupProfileUploadHost}/upload`;
    }
    static get VideoUploadURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.VideoUploadHost}/upload`;
    }
    static get AudioUploadURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.AudioUploadHost}/upload`;
    }
    static async uploadProfile(img, name, userId = -1) {
        let data = {
            'user_id': userId,
            'photo': {
                value: img,
                options: {
                    'filename': name
                }
            }
        };
        let value = await request(KakaoAPI.ProfileUploadURL, {
            method: 'POST',
            formData: data
        });
        return value;
    }
    static getUploadURL(type) {
        switch (type) {
            case this.AttachmentType.IMAGE:
                return KakaoAPI.MediaUploadURL;
            case this.AttachmentType.AUDIO:
                return KakaoAPI.AudioUploadURL;
            case this.AttachmentType.VIDEO:
                return KakaoAPI.VideoUploadURL;
            default:
                return KakaoAPI.MediaUploadURL;
        }
    }
    static getAttachmentURL(type) {
        switch (type) {
            case this.AttachmentType.IMAGE:
                return KakaoAPI.MediaFileURL;
            case this.AttachmentType.AUDIO:
                return KakaoAPI.AudioFileURL;
            case this.AttachmentType.VIDEO:
                return KakaoAPI.VideoFileURL;
            case this.AttachmentType.FILE:
                return KakaoAPI.MediaFileURL;
            default:
                return KakaoAPI.MediaFileURL;
        }
    }
    static async uploadAttachment(type, attachment, name, userId = -1) {
        let req = request(KakaoAPI.getUploadURL(type), {
            method: 'POST',
            headers: {
                'A': KakaoAPI.AuthHeaderAgent
            },
            formData: {
                'user_id': userId,
                'attachment_type': type,
                'attachment': {
                    value: attachment,
                    options: {
                        'filename': name,
                        'contentType': null
                    }
                }
            }
        });
        let str = await req;
        try {
            return JSON.parse(str)['path'];
        }
        catch (e) {
            return str;
        }
    }
    static getUploadedFile(uploadPath, type) {
        return `${this.getAttachmentURL(type)}${uploadPath}`;
    }
    static getUploadedFileKey(uploadPath) {
        return uploadPath.replace(/\/talk(m|p|gp|v|a)/, '');
    }
    static get LocoEntryPort() {
        return 443;
    }
    static get AccountInternalURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.AccountInternalHost}`;
    }
    static get InternalURL() {
        return `${KakaoAPI.InternalProtocol}://${KakaoAPI.InternalHost}`;
    }
    static get AccountPath() {
        return 'account';
    }
    static getInternalURL(type) {
        return `${KakaoAPI.InternalURL}/${KakaoAPI.Agent}/${KakaoAPI.AccountPath}/${type}`;
    }
    static getAccountInternalURL(type) {
        return `${KakaoAPI.AccountInternalURL}/${KakaoAPI.Agent}/${KakaoAPI.AccountPath}/${type}`;
    }
    static getEmoticonHeader(screenWidth = 1080, screenHeight = 1920) {
        return {
            'RESOLUTION': `${screenWidth}x${screenHeight}`,
        };
    }
    static getEmoticonURL(lang = 'kr') {
        return `http://item-${lang}.talk.kakao.co.kr/dw`;
    }
    static getEmoticonImageURL(path, lang = 'kr') {
        return `${KakaoAPI.getEmoticonURL(lang)}/${path}`;
    }
    static getEmoticonTitleURL(id, type = 'png', lang = 'kr') {
        return `${KakaoAPI.getEmoticonURL(lang)}/${id}.title.${type}`;
    }
    static getEmoticonPackURL(id, lang = 'kr') {
        return `${KakaoAPI.getEmoticonURL(lang)}/${id}.file_pack.zip`;
    }
    static getEmoticonThumbnailPackURL(id, lang = 'kr') {
        return `${KakaoAPI.getEmoticonURL(lang)}/${id}.thum_pack.zip`;
    }
    static getEmoticonImage(path, lang = 'kr') {
        return request({
            url: KakaoAPI.getEmoticonImageURL(path, lang),
            headers: KakaoAPI.getEmoticonHeader(),
            method: 'GET'
        });
    }
    static getEmoticonPack(id, lang = 'kr') {
        return request({
            url: KakaoAPI.getEmoticonPackURL(id, lang),
            headers: KakaoAPI.getEmoticonHeader(),
            method: 'GET'
        });
    }
    static getEmoticonThumbnailPack(id, lang = 'kr') {
        return request({
            url: KakaoAPI.getEmoticonThumbnailPackURL(id, lang),
            headers: KakaoAPI.getEmoticonHeader(),
            method: 'GET'
        });
    }
    static getAuthHeader(verifyCodeExtra, contentLength) {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': contentLength,
            'Host': KakaoAPI.AccountInternalHost,
            'A': KakaoAPI.AuthHeaderAgent,
            'X-VC': verifyCodeExtra,
            'User-Agent': KakaoAPI.AuthUserAgent,
            'Accept': '*/*',
            'Accept-Language': KakaoAPI.Language
        };
    }
    static getSessionHeader(accessToken, deviceUUID) {
        return {
            'Host': KakaoAPI.InternalHost,
            'Authorization': `${accessToken}-${deviceUUID}`,
            'A': KakaoAPI.AuthHeaderAgent,
            'User-Agent': KakaoAPI.AuthUserAgent,
            'Accept': '*/*',
            'Accept-Language': KakaoAPI.Language
        };
    }
    static getLoginData(email, password, deviceUUID, deviceName, permanent = true, osVersion = KakaoAPI.OSVersion, forced = false) {
        return {
            'email': email,
            'password': password,
            'device_uuid': deviceUUID,
            'os_version': osVersion,
            'device_name': deviceName,
            'permanent': permanent,
            'forced': forced
        };
    }
    static getDeviceRegisterData(email, password, deviceUUID, deviceName, passcode, permanent = true, osVersion = KakaoAPI.OSVersion) {
        return {
            'email': email,
            'password': password,
            'device_uuid': deviceUUID,
            'os_version': osVersion,
            'device_name': deviceName,
            'permanent': permanent,
            'passcode': passcode
        };
    }
    static requestLogin(email, password, deviceUUID, deviceName, forced, permanent, osVersion, verifyCodeExtra = this.calculateXVCKey(this.AuthUserAgent, email, deviceUUID)) {
        let loginData = KakaoAPI.getLoginData(email, password, deviceUUID, deviceName, permanent, osVersion, forced);
        let queryData = querystring.stringify(loginData);
        return request({
            url: KakaoAPI.getAccountInternalURL(KakaoAPI.Account.LOGIN),
            headers: KakaoAPI.getAuthHeader(verifyCodeExtra, queryData.length),
            body: queryData,
            method: 'POST'
        });
    }
    static requestPasscode(email, password, deviceUUID, deviceName, permanent, osVersion, verifyCodeExtra = this.calculateXVCKey(this.AuthUserAgent, email, deviceUUID)) {
        let loginData = KakaoAPI.getLoginData(email, password, deviceUUID, deviceName, permanent, osVersion);
        let queryData = querystring.stringify(loginData);
        return request({
            url: KakaoAPI.getAccountInternalURL(KakaoAPI.Account.REQUEST_PASSCODE),
            headers: KakaoAPI.getAuthHeader(verifyCodeExtra, queryData.length),
            body: queryData,
            method: 'POST'
        });
    }
    static registerDevice(passcode, email, password, deviceUUID, deviceName, permanent, osVersion, verifyCodeExtra = this.calculateXVCKey(this.AuthUserAgent, email, deviceUUID)) {
        let deviceRegisterData = KakaoAPI.getDeviceRegisterData(email, password, deviceUUID, deviceName, passcode, permanent, osVersion);
        let queryData = querystring.stringify(deviceRegisterData);
        return request({
            url: KakaoAPI.getAccountInternalURL(KakaoAPI.Account.REGISTER_DEVICE),
            headers: KakaoAPI.getAuthHeader(verifyCodeExtra, queryData.length),
            body: queryData,
            method: 'POST'
        });
    }
    static calculateXVCKey(aHeader, email, deviceUUID) {
        return this.calculateFullXVCKey(aHeader, email, deviceUUID).substring(0, 16);
    }
    static calculateFullXVCKey(aHeader, email, deviceUUID) {
        let res = `HEATH|${aHeader}|DEMIAN|${email}|${deviceUUID}`;
        let hash = Crypto.createHash('sha512');
        hash.update(res);
        return hash.digest('hex');
    }
    static requestAccountSettings(accessToken, deviceUUID, since = 0, language = KakaoAPI.Language) {
        return request({
            url: `${KakaoAPI.getInternalURL(KakaoAPI.LogonAccount.MORE_SETTINGS)}?since=${since}&lang=${language}`,
            headers: KakaoAPI.getSessionHeader(accessToken, deviceUUID),
            method: 'GET'
        });
    }
    static requestAutoLoginToken(accessToken, deviceUUID) {
        return request({
            url: `${KakaoAPI.getInternalURL(KakaoAPI.LogonAccount.LOGIN_TOKEN)}`,
            headers: KakaoAPI.getSessionHeader(accessToken, deviceUUID),
            method: 'GET'
        });
    }
    static createSendTextURL(message) {
        return `kakaotalk://leverage?action=sendtext&message=${encodeURIComponent(message)}`;
    }
    static createJoinLinkURL(code, ref = 'EW') {
        return `kakaoopen://join?l=${code}&r=${ref}`;
    }
}
exports.KakaoAPI = KakaoAPI;
(function (KakaoAPI) {
    let AttachmentType;
    (function (AttachmentType) {
        AttachmentType["IMAGE"] = "image/jpeg";
        AttachmentType["AUDIO"] = "audio/mp4";
        AttachmentType["VIDEO"] = "video/mp4";
        AttachmentType["FILE"] = "image/jpeg";
    })(AttachmentType = KakaoAPI.AttachmentType || (KakaoAPI.AttachmentType = {}));
    let Account;
    (function (Account) {
        Account["LOGIN"] = "login.json";
        Account["REGISTER_DEVICE"] = "register_device.json";
        Account["REQUEST_PASSCODE"] = "request_passcode.json";
        Account["LOGIN_TOKEN"] = "login_token.json";
        Account["REQUEST_VERIFY_EMAIL"] = "request_verify_email.json";
        Account["RENEW_TOKEN"] = "renew_token.json";
        Account["CHANGE_UUID"] = "change_uuid.json";
        Account["CAN_CHANGE_UUID"] = "can_change_uuid.json";
    })(Account = KakaoAPI.Account || (KakaoAPI.Account = {}));
    let LogonAccount;
    (function (LogonAccount) {
        LogonAccount["MORE_SETTINGS"] = "more_settings.json";
        LogonAccount["LESS_SETTINGS"] = "less_settings.json";
        LogonAccount["BLOCKED_LIST"] = "blocked.json";
        LogonAccount["LOGIN_TOKEN"] = "login_token.json";
    })(LogonAccount = KakaoAPI.LogonAccount || (KakaoAPI.LogonAccount = {}));
    let RequestStatusCode;
    (function (RequestStatusCode) {
        RequestStatusCode[RequestStatusCode["SUCCESS"] = 0] = "SUCCESS";
        RequestStatusCode[RequestStatusCode["LOGIN_FAILED_REASON"] = 12] = "LOGIN_FAILED_REASON";
        RequestStatusCode[RequestStatusCode["LOGIN_FAILED"] = 30] = "LOGIN_FAILED";
        RequestStatusCode[RequestStatusCode["MOBILE_UNREGISTERED"] = 32] = "MOBILE_UNREGISTERED";
        RequestStatusCode[RequestStatusCode["DEVICE_NOT_REGISTERED"] = -100] = "DEVICE_NOT_REGISTERED";
        RequestStatusCode[RequestStatusCode["ANOTHER_LOGON"] = -101] = "ANOTHER_LOGON";
        RequestStatusCode[RequestStatusCode["DEVICE_REGISTER_FAILED"] = -102] = "DEVICE_REGISTER_FAILED";
        RequestStatusCode[RequestStatusCode["PASSCODE_REQUEST_FAILED"] = -112] = "PASSCODE_REQUEST_FAILED";
        RequestStatusCode[RequestStatusCode["OPERATION_DENIED"] = -500] = "OPERATION_DENIED";
        RequestStatusCode[RequestStatusCode["ACCOUNT_RESTRICTED"] = -997] = "ACCOUNT_RESTRICTED";
    })(RequestStatusCode = KakaoAPI.RequestStatusCode || (KakaoAPI.RequestStatusCode = {}));
})(KakaoAPI = exports.KakaoAPI || (exports.KakaoAPI = {}));
//# sourceMappingURL=kakao-api.js.map