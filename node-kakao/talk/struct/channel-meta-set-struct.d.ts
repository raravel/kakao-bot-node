import { StructBase, Long } from "../..";
import { ChannelMetaStruct } from "./chat-info-struct";
export declare class ChannelMetaSetStruct implements StructBase {
    ChannelId: Long;
    MetaList: ChannelMetaStruct[];
    constructor(ChannelId?: Long, MetaList?: ChannelMetaStruct[]);
    fromJson(rawData: any): void;
    toJson(): {
        c: Long;
        ms: any[];
    };
}
