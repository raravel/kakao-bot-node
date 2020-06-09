import { LocoBsonResponsePacket } from "./loco-bson-packet";
export declare class PacketKickoutRes extends LocoBsonResponsePacket {
    Reason: number;
    constructor(status: number, Reason?: number);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
export declare enum LocoKickoutType {
    UNKNOWN = -1,
    LOGIN_ANOTHER = 0,
    ACCOUNT_DELETED = 1
}
