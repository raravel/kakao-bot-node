import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatInfoStruct } from "../talk/struct/chat-info-struct";
export declare class PacketSyncJoinOpenchatRes extends LocoBsonResponsePacket {
    OpenId: Long;
    ChatInfo: ChatInfoStruct | null;
    constructor(status: number, OpenId?: Long, ChatInfo?: ChatInfoStruct | null);
    get PacketName(): string;
    readBodyJson(rawBody: any): void;
}
