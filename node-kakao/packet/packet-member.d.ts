import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { MemberStruct } from "../talk/struct/member-struct";
export declare class PacketMemberReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    MemberIdList: Long[];
    constructor(ChannelId?: Long, MemberIdList?: Long[]);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
        memberIds: Long[];
    };
}
export declare class PacketMemberRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    MemberList: MemberStruct[];
    constructor(status: number, ChannelId?: Long, MemberList?: MemberStruct[]);
    get PacketName(): string;
    readBodyJson(json: any): void;
}
