import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
export declare class PacketSyncDeleteMessageRes extends LocoBsonResponsePacket {
    TraceId: number;
    Chatlog: ChatlogStruct;
    constructor(status: number, TraceId?: number, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
