import { OpenLinkStruct } from "../talk/struct/open-link-struct";
import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketSyncLinkReq extends LocoBsonRequestPacket {
    OpenChatToken: number;
    constructor(OpenChatToken?: number);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketSyncLinkRes extends LocoBsonResponsePacket {
    LinkList: OpenLinkStruct[];
    IdList: Long[];
    OpenChatToken: number;
    constructor(status: number, LinkList?: OpenLinkStruct[], IdList?: Long[], OpenChatToken?: number);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
