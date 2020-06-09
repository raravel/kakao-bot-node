import { StructBase } from "./struct-base";
import { Long } from "bson";
export declare enum LoginStatusCode {
    PASS = 0,
    VALIDATION_FAILED = -30,
    DEVICE_NOT_REGISTERED = -100,
    DEVICE_LOGON_ANOTHER = -101,
    RESTRICTED = -997
}
export declare class LoginAccessDataStruct implements StructBase {
    Status: LoginStatusCode;
    StoryURL: string;
    UserId: Long;
    CountryISO: string;
    CountryCode: string;
    AccountId: number;
    LogonServerTime: number;
    ResetUserData: boolean;
    AccessToken: string;
    RefreshToken: string;
    TokenType: string;
    AutoLoginEmail: string;
    DisplayAccountId: string;
    MainDevice: string;
    MainDeviceAppVersion: string;
    constructor(Status?: LoginStatusCode, StoryURL?: string, UserId?: Long, CountryISO?: string, CountryCode?: string, AccountId?: number, LogonServerTime?: number, ResetUserData?: boolean, AccessToken?: string, RefreshToken?: string, TokenType?: string, AutoLoginEmail?: string, DisplayAccountId?: string, MainDevice?: string, MainDeviceAppVersion?: string);
    fromJson(data: any): void;
    toJson(): {
        status: LoginStatusCode;
        story_url: string;
        userId: Long;
        countryIso: string;
        countryCode: string;
        accountId: number;
        server_time: number;
        resetUserData: boolean;
        access_token: string;
        refresh_token: string;
        token_type: string;
        autoLoginAccountId: string;
        displayAccountId: string;
        mainDeviceAgentName: string;
        mainDeviceAppVersion: string;
    };
}
