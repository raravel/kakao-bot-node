import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { OpenLinkStruct } from "../talk/struct/open-link-struct";
export declare class PacketInfoLinkReq extends LocoBsonRequestPacket {
    LinkIdList: Long[];
    constructor(LinkIdList?: Long[]);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketInfoLinkRes extends LocoBsonResponsePacket {
    LinkList: OpenLinkStruct[];
    constructor(status: number, LinkList?: OpenLinkStruct[]);
    get PacketName(): string;
    readBodyJson(rawBody: any): void;
}
