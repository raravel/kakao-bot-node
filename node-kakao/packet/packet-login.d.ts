/// <reference types="node" />
import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { ChatDataStruct } from "../talk/struct/chatdata-struct";
import { Long } from "bson";
export declare class PacketLoginReq extends LocoBsonRequestPacket {
    DeviceUUID: string;
    OAuthToken: string;
    Appver: string;
    Os: string;
    NetType: number;
    NetworkMccMnc: string;
    Language: string;
    Revision: number;
    RevisionData: null | Buffer;
    ChatIds: Long[];
    MaxIds: Long[];
    LastTokenId: Long;
    LastChatId: Long;
    Lbk: number;
    Bg: boolean;
    constructor(DeviceUUID?: string, OAuthToken?: string, Appver?: string, Os?: string, NetType?: number, NetworkMccMnc?: string, Language?: string, Revision?: number, RevisionData?: null | Buffer, ChatIds?: Long[], MaxIds?: Long[], LastTokenId?: Long, LastChatId?: Long, Lbk?: number, Bg?: boolean);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketLoginRes extends LocoBsonResponsePacket {
    UserId: Long;
    Revision: number;
    OpenChatToken: number;
    RevisionDetail: string;
    ChatDataList: ChatDataStruct[];
    constructor(status: number, UserId?: Long, Revision?: number, OpenChatToken?: number, RevisionDetail?: string, ChatDataList?: ChatDataStruct[]);
    get PacketName(): string;
    readBodyJson(body: any): void;
}
