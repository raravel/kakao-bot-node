import { LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long, OpenMemberType } from "..";
export declare class PacketSyncMemberTypeRes extends LocoBsonResponsePacket {
    LinkId: Long;
    ChannelId: Long;
    MemberIdList: Long[];
    MemberTypeList: OpenMemberType[];
    constructor(status: number, LinkId?: Long, ChannelId?: Long, MemberIdList?: Long[], MemberTypeList?: OpenMemberType[]);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
