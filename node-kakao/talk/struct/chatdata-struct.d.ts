import { ChannelType } from "../chat/channel-type";
import { StructBase } from "./struct-base";
import { Long } from "bson";
export interface ChatDataBase {
    ChannelId: Long;
    Type: ChannelType;
    OpenLinkId: Long;
    OpenChatToken: number;
    readonly Metadata: ChatDataMetaStruct;
}
export declare class ChatDataStruct implements ChatDataBase, StructBase {
    ChannelId: Long;
    Type: ChannelType;
    OpenLinkId: Long;
    OpenChatToken: number;
    MemberCount: number;
    PushAlert: boolean;
    readonly Metadata: ChatDataMetaStruct;
    constructor(ChannelId?: Long, Type?: ChannelType, OpenLinkId?: Long, OpenChatToken?: number, MemberCount?: number, PushAlert?: boolean, Metadata?: ChatDataMetaStruct);
    fromJson(rawData: any): void;
    toJson(): any;
}
export declare class ChatDataMetaStruct implements StructBase {
    ImageURL: string;
    FullImageURL: string;
    Name: string;
    Favorite: boolean;
    constructor(ImageURL?: string, FullImageURL?: string, Name?: string, Favorite?: boolean);
    fromJson(rawData: any): void;
    toJson(): {
        imageUrl: string;
        fullImageUrl: string;
        name: string;
        favorite: boolean;
    };
}
