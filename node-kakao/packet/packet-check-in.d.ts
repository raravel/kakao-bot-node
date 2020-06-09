import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
export declare class PacketCheckInReq extends LocoBsonRequestPacket {
    UserId: Long;
    Os: string;
    NetType: number;
    Appver: string;
    NetworkMccMnc: string;
    language: string;
    CountryIso: string;
    UseSub: boolean;
    constructor(UserId?: Long, Os?: string, NetType?: number, Appver?: string, NetworkMccMnc?: string, language?: string, CountryIso?: string, UseSub?: boolean);
    get PacketName(): string;
    toBodyJson(): {
        userId: Long;
        os: string;
        ntype: number;
        appVer: string;
        MCCMNC: string;
        lang: string;
        useSub: boolean;
    };
}
export declare class PacketCheckInRes extends LocoBsonResponsePacket {
    Host: string;
    Port: number;
    CacheExpire: number;
    constructor(status: number, Host?: string, Port?: number, CacheExpire?: number);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
