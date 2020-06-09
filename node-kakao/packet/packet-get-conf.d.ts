import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
export declare class PacketGetConfReq extends LocoBsonRequestPacket {
    NetworkMccMnc: string;
    Os: string;
    model: string;
    constructor(NetworkMccMnc?: string, Os?: string, model?: string);
    get PacketName(): string;
    toBodyJson(): {
        MCCMNC: string;
        os: string;
        model: string;
    };
}
export declare class PacketGetConfRes extends LocoBsonResponsePacket {
    HostList: string[];
    PortList: number[];
    Revision: number;
    constructor(status: number, HostList?: string[], PortList?: number[], Revision?: number);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
