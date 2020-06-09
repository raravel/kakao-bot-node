import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
import { Long } from "..";
export declare class PacketChanJoinRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    readonly Chatlog: ChatlogStruct;
    constructor(status: number, ChannelId?: Long, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
