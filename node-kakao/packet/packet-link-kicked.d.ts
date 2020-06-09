import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
export declare class PacketLinkKickedRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    Chatlog: ChatlogStruct;
    constructor(status: number, ChannelId?: Long, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
