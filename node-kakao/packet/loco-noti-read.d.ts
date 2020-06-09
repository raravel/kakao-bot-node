import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketMessageNotiReadReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    constructor(ChannelId?: Long);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
    };
}
export declare class PacketMessageNotiReadRes extends LocoBsonResponsePacket {
    constructor(status: number);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
