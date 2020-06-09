import { ChatType } from "./chat-type";
import { Long } from "bson";
import { ChatChannel } from "../channel/chat-channel";
import { ChatUser } from "../user/chat-user";
import { ChatAttachment, PhotoAttachment, MessageTemplate } from "../..";
import { MentionContentList, ChatMention } from "./attachment/chat-attachment";
import { ChatFeed } from "./chat-feed";
export declare abstract class Chat {
    private prevLogId;
    private logId;
    private channel;
    private sender;
    private messageId;
    private text;
    private attachmentList;
    private mentionMap;
    private sendTime;
    constructor(channel: ChatChannel, sender: ChatUser, messageId: number, logId: Long, prevLogId: Long, sendTime: number, text: string, rawAttachment?: string);
    get Channel(): ChatChannel;
    get Sender(): ChatUser;
    get PrevLogId(): Long;
    get LogId(): Long;
    get MessageId(): number;
    get Text(): string;
    get SendTime(): number;
    get AttachmentList(): ChatAttachment[];
    get MentionMap(): Map<string, MentionContentList>;
    getMentionContentList(): MentionContentList[];
    isMentioned(userId: Long): boolean;
    getUserMentionList(userId: Long): MentionContentList | null;
    getMentionCount(userId: Long): number;
    abstract get Type(): ChatType;
    isFeed(): boolean;
    private feed?;
    getFeed(): ChatFeed;
    protected processAttachment(text: string, rawAttachment: string): void;
    protected abstract readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
    protected processMention(rawMentions: any[]): void;
    replyText(...textFormat: (string | ChatMention)[]): Promise<Chat>;
    replyTemplate(template: MessageTemplate): Promise<Chat>;
    get Deletable(): boolean;
    get Hidable(): boolean;
    delete(): Promise<boolean>;
    hide(): Promise<boolean>;
}
export declare class UnknownChat extends Chat {
    private rawAttachment;
    get Type(): ChatType;
    get RawAttachment(): any;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class FeedChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class TextChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare abstract class PhotoChat extends Chat {
    get AttachmentList(): PhotoAttachment[];
}
export declare class SinglePhotoChat extends PhotoChat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class MultiPhotoChat extends PhotoChat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare abstract class EmoticonChat extends Chat {
}
export declare class StaticEmoticonChat extends EmoticonChat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class AnimatedEmoticonChat extends EmoticonChat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class VideoChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class LongTextChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class SharpSearchChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class MapChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class ReplyChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
export declare class CustomChat extends Chat {
    get Type(): ChatType;
    protected readAttachment(attachmentJson: any, attachmentList: ChatAttachment[]): void;
}
