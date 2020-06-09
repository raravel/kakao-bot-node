import { LocoBsonResponsePacket, LocoBsonRequestPacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketLeaveReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    Block: boolean;
    constructor(ChannelId?: Long, Block?: boolean);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
        block: boolean;
    };
}
export declare class PacketLeaveRes extends LocoBsonResponsePacket {
    LastTokenId: Long;
    constructor(status: number, LastTokenId?: Long);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
export declare class PacketLeftRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    LastTokenId: Long;
    constructor(status: number, ChannelId?: Long, LastTokenId?: Long);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
