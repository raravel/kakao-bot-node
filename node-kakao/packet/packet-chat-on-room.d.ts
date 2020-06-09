import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { MemberStruct } from "../talk/struct/member-struct";
import { ChannelType } from "../talk/chat/channel-type";
import { OpenMemberStruct } from "../talk/struct/open-link-struct";
export declare class PacketChatOnRoomReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    Token: Long;
    OpenChatToken: number;
    constructor(ChannelId?: Long, Token?: Long, OpenChatToken?: number);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketChatOnRoomRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    MemberList: MemberStruct[];
    Type: ChannelType;
    WatermarkList: Long[];
    OpenChatToken: number;
    ClientOpenProfile: OpenMemberStruct | null;
    constructor(status: number, ChannelId?: Long, MemberList?: MemberStruct[], Type?: ChannelType, WatermarkList?: Long[], OpenChatToken?: number, ClientOpenProfile?: OpenMemberStruct | null);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
