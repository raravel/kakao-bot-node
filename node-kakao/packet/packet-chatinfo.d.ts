import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatInfoStruct } from "../talk/struct/chat-info-struct";
export declare class PacketChatInfoReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    constructor(ChannelId?: Long);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
    };
}
export declare class PacketChatInfoRes extends LocoBsonResponsePacket {
    ChatInfo: ChatInfoStruct;
    constructor(status: number, ChatInfo?: ChatInfoStruct);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
