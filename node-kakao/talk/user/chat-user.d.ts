/// <reference types="node" />
import { LoginAccessDataStruct } from "../struct/login-access-data-struct";
import { Long } from "bson";
import { MemberStruct } from "../struct/member-struct";
import { ClientSettingsStruct } from "../struct/client-settings-struct";
import { OpenMemberStruct } from "../struct/open-link-struct";
import { UserType } from "./user-type";
import { EventEmitter } from "events";
import { ChatChannel } from "../channel/chat-channel";
import { Chat } from "../chat/chat";
import { ChatFeed } from "../chat/chat-feed";
import { TalkClient } from "../../talk-client";
export declare class ChatUser extends EventEmitter {
    private client;
    private id;
    private nickname;
    constructor(client: TalkClient, userId: Long, nickname?: string);
    get Client(): TalkClient;
    get Id(): Long;
    get Nickname(): string;
    updateNickname(nickname: string): void;
    isClientUser(): boolean;
    createDM(): Promise<ChatChannel>;
    on(event: 'message', listener: (chat: Chat) => void): this;
    on(event: 'message_read', listener: (channel: ChatChannel, watermark: Long) => void): this;
    on(event: 'join', listener: (newChannel: ChatChannel, joinFeed: ChatFeed) => void): this;
    on(event: 'left', listener: (leftChannel: ChatChannel, leftFeed: ChatFeed) => void): this;
    once(event: 'message', listener: (chat: Chat) => void): this;
    once(event: 'message_read', listener: (channel: ChatChannel, watermark: Long) => void): this;
    once(event: 'join', listener: (newChannel: ChatChannel, joinFeed: ChatFeed) => void): this;
    once(event: 'left', listener: (leftChannel: ChatChannel, leftFeed: ChatFeed) => void): this;
}
export interface UserInfoBase {
    readonly ProfileImageURL: string;
    readonly FullProfileImageURL: string;
    readonly OriginalProfileImageURL: string;
    readonly LastInfoCache: number;
}
export interface ChatUserInfoBase extends UserInfoBase {
    readonly AccountId: number;
    update(memberStruct: MemberStruct): void;
    updateFromStruct(memberStruct: MemberStruct): void;
}
export declare class UserInfo implements ChatUserInfoBase {
    private user;
    private accountId;
    private profileImageURL;
    private fullProfileImageURL;
    private originalProfileImageURL;
    private openProfileToken?;
    private profileLinkId?;
    private lastInfoCache;
    private userType;
    constructor(user: ChatUser);
    get User(): ChatUser;
    get AccountId(): number;
    get ProfileImageURL(): string;
    get FullProfileImageURL(): string;
    get OriginalProfileImageURL(): string;
    get LastInfoCache(): number;
    get ProfileLinkId(): Long | undefined;
    get OpenProfileToken(): number | undefined;
    get UserType(): UserType;
    isOpenUser(): boolean;
    hasOpenProfile(): boolean;
    update(memberStruct: MemberStruct): void;
    updateFromStruct(memberStruct: MemberStruct): void;
    updateFromOpenStruct(memberStruct: OpenMemberStruct): void;
}
export declare class ClientChatUser extends ChatUser {
    private mainOpenToken;
    private mainUserInfo;
    constructor(client: TalkClient, clientAccessData: LoginAccessDataStruct, settings: ClientSettingsStruct, mainOpenToken: number);
    get MainUserInfo(): ClientUserInfo;
    get MainOpenToken(): number;
    isClientUser(): boolean;
}
export declare class ClientUserInfo implements ChatUserInfoBase {
    private clientAccessData;
    private settings;
    constructor(clientAccessData: LoginAccessDataStruct, settings: ClientSettingsStruct);
    get AccountId(): number;
    get ProfileImageURL(): string;
    get FullProfileImageURL(): string;
    get OriginalProfileImageURL(): string;
    get BackgroundImageURL(): string;
    get OriginalBackgroundImageURL(): string;
    get LastInfoCache(): number;
    get KakaoStoryURL(): string;
    get LogonTime(): number;
    get MainDeviceName(): string;
    get MainDeviceAppVer(): string;
    update(memberStruct: MemberStruct): void;
    updateFromStruct(memberStruct: MemberStruct): void;
}
