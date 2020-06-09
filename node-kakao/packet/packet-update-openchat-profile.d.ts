import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { OpenMemberStruct } from "../talk/struct/open-link-struct";
import { OpenchatProfileType } from "../talk/open/open-link-type";
export declare class PacketUpdateOpenchatProfileReq extends LocoBsonRequestPacket {
    LinkId: Long;
    ProfileType: OpenchatProfileType;
    Nickname: string;
    ProfilePath: string;
    ProfileLinkId: Long;
    constructor(LinkId?: Long, ProfileType?: OpenchatProfileType, Nickname?: string, ProfilePath?: string, ProfileLinkId?: Long);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketUpdateOpenchatProfileRes extends LocoBsonResponsePacket {
    UpdatedProfile: OpenMemberStruct;
    constructor(status: number, UpdatedProfile?: OpenMemberStruct);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
