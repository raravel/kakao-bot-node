import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
export declare class PacketSyncMessageReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    StartLogId: Long;
    Count: number;
    CurrentLogId: Long;
    constructor(ChannelId?: Long, StartLogId?: Long, Count?: number, CurrentLogId?: Long);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
        cur: Long;
        cnt: number;
        max: Long;
    };
}
export declare class PacketSyncMessageRes extends LocoBsonResponsePacket {
    IsOK: boolean;
    ChatList: ChatlogStruct[];
    LastTokenId: Long;
    LinkId: Long;
    constructor(status: number, IsOK?: boolean, ChatList?: ChatlogStruct[], LastTokenId?: Long, LinkId?: Long);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
