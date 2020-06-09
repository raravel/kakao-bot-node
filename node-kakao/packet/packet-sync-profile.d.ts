import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { OpenMemberStruct } from "../talk/struct/open-link-struct";
export declare class PacketSyncProfileRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    LinkId: Long;
    OpenMember: OpenMemberStruct;
    constructor(status: number, ChannelId?: Long, LinkId?: Long, OpenMember?: OpenMemberStruct);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
