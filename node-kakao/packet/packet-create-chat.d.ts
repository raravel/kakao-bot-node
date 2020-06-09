import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { ChatInfoStruct } from "../talk/struct/chat-info-struct";
export declare class PacketCreateChatReq extends LocoBsonRequestPacket {
    UserIdList: Long[];
    Nickname: string;
    ProfileURL: string;
    constructor(UserIdList?: Long[], Nickname?: string, ProfileURL?: string);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketCreateChatRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    readonly ChatInfo: ChatInfoStruct;
    constructor(status: number, ChannelId?: Long, ChatInfo?: ChatInfoStruct);
    get PacketName(): string;
    readBodyJson(rawBody: any): void;
}
