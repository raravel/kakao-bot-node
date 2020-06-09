import { StructBase } from "./struct-base";
import { ChatType } from "../chat/chat-type";
import { Long } from "bson";
export declare class ChatlogStruct implements StructBase {
    LogId: Long;
    PrevLogId: Long;
    SenderId: Long;
    ChannelId: Long;
    Type: ChatType;
    Text: string;
    SendTime: number;
    RawAttachment: string;
    MessageId: number;
    constructor(LogId?: Long, PrevLogId?: Long, SenderId?: Long, ChannelId?: Long, Type?: ChatType, Text?: string, SendTime?: number, RawAttachment?: string, MessageId?: number);
    fromJson(rawJson: any): void;
    toJson(): {
        logId: Long;
        prevId: Long;
        authorId: Long;
        chatId: Long;
        msgId: number;
        t: ChatType;
        message: string;
        attachment: string;
        sendAt: number;
    };
}
