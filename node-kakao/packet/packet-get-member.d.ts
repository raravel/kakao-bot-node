import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "..";
import { MemberStruct } from "../talk/struct/member-struct";
export declare class PacketGetMemberReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    constructor(ChannelId?: Long);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
    };
}
export declare class PacketGetMemberRes extends LocoBsonResponsePacket {
    MemberList: MemberStruct[];
    constructor(status: number, MemberList?: MemberStruct[]);
    get PacketName(): string;
    readBodyJson(json: any): void;
}
