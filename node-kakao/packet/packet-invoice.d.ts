import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { ChatType } from "../talk/chat/chat-type";
import { Long } from "bson";
export declare class PacketInvoiceRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    Type: ChatType;
    Extra: string;
    constructor(status: number, ChannelId?: Long, Type?: ChatType, Extra?: string);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
