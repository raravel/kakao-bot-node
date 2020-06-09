import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { OpenLinkStruct } from "../talk/struct/open-link-struct";
export declare class PacketJoinInfoReq extends LocoBsonRequestPacket {
    OpenLinkURL: string;
    LinkRef: string;
    constructor(OpenLinkURL?: string, LinkRef?: string);
    get PacketName(): string;
    toBodyJson(): {
        lu: string;
        ref: string;
    };
}
export declare class PacketJoinInfoRes extends LocoBsonResponsePacket {
    OpenLink: OpenLinkStruct;
    constructor(status: number, OpenLink?: OpenLinkStruct);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
