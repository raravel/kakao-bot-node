import { LocoBsonRequestPacket, LocoBsonResponsePacket } from "./loco-bson-packet";
import { Long } from "..";
import { ChannelMetaStruct, ChannelMetaType } from "../talk/struct/chat-info-struct";
export declare class PacketGetMetaReq extends LocoBsonRequestPacket {
    ChannelId: Long;
    MetaTypeList: ChannelMetaType[];
    constructor(ChannelId?: Long, MetaTypeList?: ChannelMetaType[]);
    get PacketName(): string;
    toBodyJson(): {
        chatId: Long;
        types: ChannelMetaType[];
    };
}
export declare class PacketGetMetaRes extends LocoBsonResponsePacket {
    ChannelId: Long;
    MetaList: ChannelMetaStruct[];
    constructor(status: number, ChannelId?: Long, MetaList?: ChannelMetaStruct[]);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
export declare class PacketGetMetasReq extends LocoBsonRequestPacket {
    ChannelList: Long[];
    constructor(ChannelList?: Long[]);
    get PacketName(): string;
    toBodyJson(): {
        cs: Long[];
    };
}
export declare class PacketGetMetasRes extends LocoBsonResponsePacket {
    ChannelList: Long[];
    constructor(status: number, ChannelList?: Long[]);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
