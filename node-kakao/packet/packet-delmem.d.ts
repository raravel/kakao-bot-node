import { ChatlogStruct } from "../talk/struct/chatlog-struct";
import { LocoBsonResponsePacket } from "./loco-bson-packet";
export declare class PacketDeleteMemberRes extends LocoBsonResponsePacket {
    Chatlog: ChatlogStruct;
    constructor(status: number, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
