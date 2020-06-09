import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "bson";
import { FeedType } from "../talk/feed/feed-type";
export declare class PacketRewriteReq extends LocoBsonRequestPacket {
    LinkId: Long;
    ChannelId: Long;
    LogId: Long;
    Time: number;
    RewriteFeedType: FeedType;
    Unknown1: string;
    Unknown2: string;
    constructor(LinkId?: Long, ChannelId?: Long, LogId?: Long, Time?: number, RewriteFeedType?: FeedType, Unknown1?: string, Unknown2?: string);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class PacketRewriteRes extends LocoBsonResponsePacket {
    get PacketName(): string;
    readBodyJson(body: any): void;
}
