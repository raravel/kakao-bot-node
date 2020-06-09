import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
import { OpenMemberType } from "../talk/open/open-link-type";
export declare class PacketSetMemTypeReq extends LocoBsonRequestPacket {
    LinkId: Long;
    ChannelId: Long;
    MemberIdList: Long[];
    MemberTypeList: OpenMemberType[];
    constructor(LinkId?: Long, ChannelId?: Long, MemberIdList?: Long[], MemberTypeList?: OpenMemberType[]);
    get PacketName(): string;
    toBodyJson(): {
        li: Long;
        c: Long;
        mids: Long[];
        mts: OpenMemberType[];
    };
}
export declare class PacketSetMemTypeRes extends LocoBsonResponsePacket {
    LinkId: Long;
    ChannelId: Long;
    Chatlog: ChatlogStruct;
    MemberIdList: Long[];
    MemberTypeList: OpenMemberType[];
    Unknown1: Long[];
    constructor(status: number, LinkId?: Long, ChannelId?: Long, Chatlog?: ChatlogStruct, MemberIdList?: Long[], MemberTypeList?: OpenMemberType[], Unknown1?: Long[]);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
