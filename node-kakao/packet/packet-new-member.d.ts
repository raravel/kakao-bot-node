import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
export declare class PacketNewMemberRes extends LocoBsonResponsePacket {
    Chatlog: ChatlogStruct;
    constructor(status: number, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
