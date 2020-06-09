import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long, OpenchatProfileType } from "..";
import { MemberStruct } from "../talk/struct/member-struct";
import { OpenLinkStruct } from "../talk/struct/open-link-struct";
import { ChatInfoStruct } from "../talk/struct/chat-info-struct";
import { ChatlogStruct } from "../talk/struct/chatlog-struct";
export declare class PacketJoinLinkReq extends LocoBsonRequestPacket {
    LinkId: Long;
    Ref: string;
    ChannelKey: string;
    ProfileType: OpenchatProfileType;
    Nickname: string;
    ProfilePath: string;
    ProfileLinkId: Long;
    constructor(LinkId?: Long, Ref?: string, ChannelKey?: string, ProfileType?: OpenchatProfileType, Nickname?: string, ProfilePath?: string, ProfileLinkId?: Long);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketJoinLinkRes extends LocoBsonResponsePacket {
    LinkInfo: OpenLinkStruct;
    OpenMember: MemberStruct;
    ChatInfo: ChatInfoStruct;
    Chatlog: ChatlogStruct;
    constructor(status: number, LinkInfo?: OpenLinkStruct, OpenMember?: MemberStruct, ChatInfo?: ChatInfoStruct, Chatlog?: ChatlogStruct);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
