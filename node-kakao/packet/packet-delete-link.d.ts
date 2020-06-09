import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketDeleteLinkReq extends LocoBsonRequestPacket {
    LinkId: Long;
    constructor(LinkId?: Long);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketDeleteLinkRes extends LocoBsonResponsePacket {
    get PacketName(): string;
    readBodyJson(body: any): void;
}
