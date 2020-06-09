import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { ChatType } from "../talk/chat/chat-type";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
import { Long } from "bson";
export declare class PacketMessageWriteReq extends LocoBsonRequestPacket {
    MessageId: number;
    ChannelId: Long;
    Text: string;
    Type: ChatType;
    NoSeen: boolean;
    Extra: string;
    constructor(MessageId?: number, ChannelId?: Long, Text?: string, Type?: ChatType, NoSeen?: boolean, Extra?: string);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketMessageWriteRes extends LocoBsonResponsePacket {
    MessageId: number;
    ChannelId: Long;
    LogId: Long;
    PrevLogId: Long;
    SenderNickname: string;
    SendTime: number;
    constructor(status: number, MessageId?: number, ChannelId?: Long, LogId?: Long, PrevLogId?: Long, SenderNickname?: string, SendTime?: number);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
export declare class PacketMessageRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    SenderNickname: string;
    readonly Chatlog: ChatlogStruct;
    NoSeen: boolean;
    PushAlert: boolean;
    constructor(status: number, ChannelId?: Long, SenderNickname?: string, Chatlog?: ChatlogStruct, NoSeen?: boolean, PushAlert?: boolean);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
