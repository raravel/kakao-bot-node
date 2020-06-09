import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { MemberStruct } from "../talk/struct/member-struct";
import { Long } from "bson";
export declare class PacketChatMemberReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    UserIdLIst: Long[];
    constructor(ChannelId?: Long, UserIdLIst?: Long[]);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
        memberIds: Long[];
    };
}
export declare class PacketChatMemberRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    MemberList: MemberStruct[];
    constructor(status: number, ChannelId?: Long, MemberList?: MemberStruct[]);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
