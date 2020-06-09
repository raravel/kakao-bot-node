import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketMessageReadRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    ReaderId: Long;
    Watermark: Long;
    constructor(status: number, ChannelId?: Long, ReaderId?: Long, Watermark?: Long);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
