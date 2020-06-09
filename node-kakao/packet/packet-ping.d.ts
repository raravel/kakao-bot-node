import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
export declare class PacketPingReq extends LocoBsonRequestPacket {
    get PacketName(): string;
    toBodyJson(): {};
}
export declare class PacketPingRes extends LocoBsonResponsePacket {
    get PacketName(): string;
    readBodyJson(): void;
}
