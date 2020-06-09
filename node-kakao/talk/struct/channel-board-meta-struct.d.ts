import { StructBase } from "./struct-base";
export declare class ChannelBoardMetaStruct implements StructBase {
    fromJson(rawData: any): void;
    toJson(): void;
}
export declare enum ChannelBoardType {
    NONE = 0,
    FLOATING_NOTICE = 1,
    SIDE_NOTICE = 2,
    BADGE = 3
}
