import { StructBase } from "./struct-base";
import { Long } from "bson";
import { ChannelType } from "../chat/channel-type";
import { ChatlogStruct } from "./chatlog-struct";
import { MemberStruct } from "./member-struct";
import { ChatDataBase } from "./chatdata-struct";
export declare class ChatInfoStruct implements ChatDataBase, StructBase {
    ChannelId: Long;
    Type: ChannelType;
    OpenLinkId: Long;
    OpenChatToken: number;
    ActiveMemberCount: number;
    NewMessageCount: number;
    LastUpdatedAt: string | null;
    LastMessage: string | null;
    LastLogId: Long;
    LastSeenLogId: Long;
    LastChatLog: ChatlogStruct | null;
    readonly Metadata: ChatMetaStruct;
    readonly ActiveMemberList: MemberStruct[];
    PushAlert: boolean;
    ChatMetaList: ChannelMetaStruct[];
    IsDirectChat: boolean;
    constructor(ChannelId?: Long, Type?: ChannelType, OpenLinkId?: Long, OpenChatToken?: number, ActiveMemberCount?: number, NewMessageCount?: number, LastUpdatedAt?: string | null, LastMessage?: string | null, LastLogId?: Long, LastSeenLogId?: Long, LastChatLog?: ChatlogStruct | null, Metadata?: ChatMetaStruct, ActiveMemberList?: MemberStruct[], PushAlert?: boolean, ChatMetaList?: ChannelMetaStruct[], IsDirectChat?: boolean);
    fromJson(rawJson: any): void;
    toJson(): any;
}
export declare class ChatMetaStruct implements StructBase {
    FullImageURL: string;
    ImageURL: string;
    Name: string;
    Favorite: boolean;
    constructor(FullImageURL?: string, ImageURL?: string, Name?: string, Favorite?: boolean);
    toJson(): {
        imageUrl: string;
        fullImageUrl: string;
        name: string;
        favorite: boolean;
    };
    fromJson(rawJson: any): void;
}
export declare enum ChannelMetaType {
    NOTICE = 1,
    GROUP = 2,
    TITLE = 3,
    PROFILE = 4,
    TV = 5,
    PRIVILEGE = 6,
    TV_LIVE = 7,
    PLUS_BACKGROUND = 8,
    LIVE_TALK_INFO = 11,
    LIVE_TALK_COUNT = 12
}
export declare class ChannelMetaStruct implements StructBase {
    Type: ChannelMetaType;
    Revision: Long;
    AuthorId: Long;
    Content: string;
    UpdatedAt: number;
    constructor(Type?: ChannelMetaType, Revision?: Long, AuthorId?: Long, Content?: string, UpdatedAt?: number);
    toJson(): {
        type: ChannelMetaType;
        revision: Long;
        authorId: Long;
        content: string;
        updateAt: number;
    };
    fromJson(rawJson: any): void;
}
