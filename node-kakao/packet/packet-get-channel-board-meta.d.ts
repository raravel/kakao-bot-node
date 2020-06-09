import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "..";
import { ChannelBoardType } from "../talk/struct/channel-board-meta-struct";
export declare class PacketGetChannelBoardMetaReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    MetaTypeList: ChannelBoardType[];
    constructor(ChannelId?: Long, MetaTypeList?: ChannelBoardType[]);
    get PacketName(): string;
    toBodyJson(): {
        c: Long;
        ts: ChannelBoardType[];
    };
}
export declare class PacketGetMoimMetaRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    constructor(status: number, ChannelId?: Long);
    get PacketName(): string;
    readBodyJson(rawData: any): void;
}
