/// <reference types="node" />
import * as request from "request-promise";
export declare class KakaoAPI {
    static get LocoPEMPublicKey(): string;
    static get LocoPublicKey(): {
        n: Buffer;
        e: number;
    };
    static get Agent(): string;
    static get Version(): string;
    static get InternalAppVersion(): string;
    static get InternalAppSubVersion(): string;
    static get OSVersion(): string;
    static get Language(): string;
    static get AuthUserAgent(): string;
    static get AuthHeaderAgent(): string;
    static get InternalProtocol(): string;
    static get AccountInternalHost(): string;
    static get InternalHost(): string;
    static get LocoEntry(): string;
    static get ProfileUploadHost(): string;
    static get MediaUploadHost(): string;
    static get VideoUploadHost(): string;
    static get AudioUploadHost(): string;
    static get GroupProfileUploadHost(): string;
    static get FileHost(): string;
    static get MediaFileHost(): string;
    static get AudioFileHost(): string;
    static get VideoFileHost(): string;
    static get MediaFileURL(): string;
    static get ProfileFileURL(): string;
    static get GroupProfileFileURL(): string;
    static get VideoFileURL(): string;
    static get AudioFileURL(): string;
    static get FileFileURL(): string;
    static get MediaUploadURL(): string;
    static get ProfileUploadURL(): string;
    static get GroupProfileUploadURL(): string;
    static get VideoUploadURL(): string;
    static get AudioUploadURL(): string;
    static uploadProfile(img: Buffer, name: string, userId?: number): Promise<string>;
    static getUploadURL(type: KakaoAPI.AttachmentType): string;
    static getAttachmentURL(type: KakaoAPI.AttachmentType): string;
    static uploadAttachment(type: KakaoAPI.AttachmentType, attachment: Buffer, name: string, userId?: number): Promise<string>;
    static getUploadedFile(uploadPath: string, type: KakaoAPI.AttachmentType): string;
    static getUploadedFileKey(uploadPath: string): string;
    static get LocoEntryPort(): number;
    static get AccountInternalURL(): string;
    static get InternalURL(): string;
    static get AccountPath(): string;
    static getInternalURL(type: KakaoAPI.LogonAccount): string;
    static getAccountInternalURL(type: KakaoAPI.Account): string;
    static getEmoticonHeader(screenWidth?: number, screenHeight?: number): {
        RESOLUTION: string;
    };
    static getEmoticonURL(lang?: string): string;
    static getEmoticonImageURL(path: string, lang?: string): string;
    static getEmoticonTitleURL(id: string, type?: string, lang?: string): string;
    static getEmoticonPackURL(id: string, lang?: string): string;
    static getEmoticonThumbnailPackURL(id: string, lang?: string): string;
    static getEmoticonImage(path: string, lang?: string): request.RequestPromise<any>;
    static getEmoticonPack(id: string, lang?: string): request.RequestPromise<any>;
    static getEmoticonThumbnailPack(id: string, lang?: string): request.RequestPromise<any>;
    static getAuthHeader(verifyCodeExtra: string, contentLength: number): {
        'Content-Type': string;
        'Content-Length': number;
        Host: string;
        A: string;
        'X-VC': string;
        'User-Agent': string;
        Accept: string;
        'Accept-Language': string;
    };
    static getSessionHeader(accessToken: string, deviceUUID: string): {
        Host: string;
        Authorization: string;
        A: string;
        'User-Agent': string;
        Accept: string;
        'Accept-Language': string;
    };
    static getLoginData(email: string, password: string, deviceUUID: string, deviceName: string, permanent?: boolean, osVersion?: string, forced?: boolean): {
        email: string;
        password: string;
        device_uuid: string;
        os_version: string;
        device_name: string;
        permanent: boolean;
        forced: boolean;
    };
    static getDeviceRegisterData(email: string, password: string, deviceUUID: string, deviceName: string, passcode: string, permanent?: boolean, osVersion?: string): {
        email: string;
        password: string;
        device_uuid: string;
        os_version: string;
        device_name: string;
        permanent: boolean;
        passcode: string;
    };
    static requestLogin(email: string, password: string, deviceUUID: string, deviceName: string, forced?: boolean, permanent?: boolean, osVersion?: string, verifyCodeExtra?: string): request.RequestPromise<any>;
    static requestPasscode(email: string, password: string, deviceUUID: string, deviceName: string, permanent?: boolean, osVersion?: string, verifyCodeExtra?: string): request.RequestPromise<any>;
    static registerDevice(passcode: string, email: string, password: string, deviceUUID: string, deviceName: string, permanent?: boolean, osVersion?: string, verifyCodeExtra?: string): request.RequestPromise<any>;
    static calculateXVCKey(aHeader: string, email: string, deviceUUID: string): string;
    static calculateFullXVCKey(aHeader: string, email: string, deviceUUID: string): string;
    static requestAccountSettings(accessToken: string, deviceUUID: string, since?: number, language?: string): request.RequestPromise<any>;
    static requestAutoLoginToken(accessToken: string, deviceUUID: string): request.RequestPromise<any>;
    static createSendTextURL(message: string): string;
    static createJoinLinkURL(code: string, ref?: string): string;
}
export declare namespace KakaoAPI {
    enum AttachmentType {
        IMAGE = "image/jpeg",
        AUDIO = "audio/mp4",
        VIDEO = "video/mp4",
        FILE = "image/jpeg"
    }
    enum Account {
        LOGIN = "login.json",
        REGISTER_DEVICE = "register_device.json",
        REQUEST_PASSCODE = "request_passcode.json",
        LOGIN_TOKEN = "login_token.json",
        REQUEST_VERIFY_EMAIL = "request_verify_email.json",
        RENEW_TOKEN = "renew_token.json",
        CHANGE_UUID = "change_uuid.json",
        CAN_CHANGE_UUID = "can_change_uuid.json"
    }
    enum LogonAccount {
        MORE_SETTINGS = "more_settings.json",
        LESS_SETTINGS = "less_settings.json",
        BLOCKED_LIST = "blocked.json",
        LOGIN_TOKEN = "login_token.json"
    }
    enum RequestStatusCode {
        SUCCESS = 0,
        LOGIN_FAILED_REASON = 12,
        LOGIN_FAILED = 30,
        MOBILE_UNREGISTERED = 32,
        DEVICE_NOT_REGISTERED = -100,
        ANOTHER_LOGON = -101,
        DEVICE_REGISTER_FAILED = -102,
        PASSCODE_REQUEST_FAILED = -112,
        OPERATION_DENIED = -500,
        ACCOUNT_RESTRICTED = -997
    }
}
