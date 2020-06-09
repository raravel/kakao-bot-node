import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
export declare class PacketKickMemberReq extends LocoBsonRequestPacket {
    LinkId: Long;
    ChannelId: Long;
    MemberId: Long;
    constructor(LinkId?: Long, ChannelId?: Long, MemberId?: Long);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketKickMemberRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    MemberId: Long;
    Chatlog: ChatlogStruct;
    constructor(status: number, ChannelId?: Long, MemberId?: Long, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
