/// <reference types="node" />
import { Long } from "bson";
import { ChatType } from "../chat-type";
import { Chat } from "../chat";
import { ChatUser } from "../../user/chat-user";
export interface ChatAttachment {
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    readonly RequiredMessageType: ChatType;
}
export interface AttachmentContent {
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class PhotoAttachment implements ChatAttachment {
    KeyPath: string;
    Width: number;
    Height: number;
    ImageURL: string;
    Size: Long;
    ThumbnailURL: string;
    ThumbnailWidth: number;
    ThumbnailHeight: number;
    constructor(KeyPath?: string, Width?: number, Height?: number, ImageURL?: string, Size?: Long, ThumbnailURL?: string, ThumbnailWidth?: number, ThumbnailHeight?: number);
    get RequiredMessageType(): ChatType;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    static fromBuffer(data: Buffer, name: string, width: number, height: number, size?: number): Promise<PhotoAttachment>;
}
export declare class VideoAttachment implements ChatAttachment {
    KeyPath: string;
    Width: number;
    Height: number;
    Duration: number;
    VideoURL: string;
    Size: Long;
    constructor(KeyPath?: string, Width?: number, Height?: number, Duration?: number, VideoURL?: string, Size?: Long);
    get RequiredMessageType(): ChatType;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    static fromBuffer(data: Buffer, name: string, width: number, height: number, duration: number, size?: number): Promise<VideoAttachment>;
}
export declare class FileAttachment implements ChatAttachment {
    KeyPath: string;
    FileURL: string;
    Name: string;
    Size: Long;
    Expire: Long;
    constructor(KeyPath?: string, FileURL?: string, Name?: string, Size?: Long, Expire?: Long);
    get RequiredMessageType(): ChatType;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    static fromBuffer(data: Buffer, name: string, width: number, height: number, size?: number): Promise<FileAttachment>;
}
export declare class AudioAttachment implements ChatAttachment {
    KeyPath: string;
    AudioURL: string;
    Size: Long;
    constructor(KeyPath?: string, AudioURL?: string, Size?: Long);
    get RequiredMessageType(): ChatType;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    static fromBuffer(data: Buffer, name: string, size?: number): Promise<AudioAttachment>;
}
export declare class EmoticonAttachment implements ChatAttachment {
    Name: string;
    Path: string;
    Type: string;
    StopAt: number;
    Sound: string;
    Width: number;
    Height: number;
    Description: string;
    constructor(Name?: string, Path?: string, Type?: string, StopAt?: number, Sound?: string, Width?: number, Height?: number, Description?: string);
    get RequiredMessageType(): ChatType;
    getEmoticonURL(region?: string): string;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
}
export declare class EmoticonAniAttachment extends EmoticonAttachment {
    get RequiredMessageType(): ChatType;
}
export declare class LongTextAttachment implements ChatAttachment {
    Path: string;
    KeyPath: string;
    Size: Long;
    TextOmitted: boolean;
    constructor(Path?: string, KeyPath?: string, Size?: Long, TextOmitted?: boolean);
    get RequiredMessageType(): ChatType;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    static fromText(longText: string, name: string, size?: number): Promise<LongTextAttachment>;
    static fromBuffer(data: Buffer, name: string, size?: number): Promise<LongTextAttachment>;
}
export declare class MapAttachment implements ChatAttachment {
    Lat: number;
    Lng: number;
    Name: string;
    C: boolean;
    constructor(Lat?: number, Lng?: number, Name?: string, C?: boolean);
    get RequiredMessageType(): ChatType;
    readAttachment(rawData: any): void;
    toJsonAttachment(): {
        lat: number;
        lng: number;
        a: string;
        c: boolean;
    };
}
export declare class MentionContentList implements AttachmentContent {
    UserId: Long;
    Length: number;
    IndexList: number[];
    constructor(UserId?: Long, Length?: number, IndexList?: number[]);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export interface ChatContent {
    readonly ContentType: string;
}
export declare class ChatMention implements ChatContent {
    User: ChatUser;
    constructor(User: ChatUser);
    get ContentType(): string;
}
export declare class ReplyAttachment implements ChatAttachment {
    SourceType: ChatType;
    SourceLogId: Long;
    SourceUserId: Long;
    SourceMessage: string;
    SourceMentionList: MentionContentList[];
    SourceLinkId: Long;
    constructor(SourceType?: ChatType, SourceLogId?: Long, SourceUserId?: Long, SourceMessage?: string, SourceMentionList?: MentionContentList[], SourceLinkId?: Long);
    get RequiredMessageType(): ChatType;
    readAttachment(rawData: any): void;
    toJsonAttachment(): any;
    static fromChat(chat: Chat): ReplyAttachment;
}
