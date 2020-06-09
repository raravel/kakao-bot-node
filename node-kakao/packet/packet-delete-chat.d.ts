import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketDeleteChatReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    LogId: Long;
    constructor(ChannelId?: Long, LogId?: Long);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
        logId: Long;
    };
}
export declare class PacketDeleteChatRes extends LocoBsonResponsePacket {
    get PacketName(): string;
    readBodyJson(body: any): void;
}
