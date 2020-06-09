/// <reference types="node" />
import { LocoHeaderStruct } from "./loco-header-struct";
import { LocoResponsePacket } from "./loco-packet-base";
export declare class LocoPacketReader {
    private latestReadPacketId;
    constructor();
    get LatestReadPacketId(): number;
    structHeader(buffer: Buffer, offset?: number): LocoHeaderStruct;
    structToPacket(header: LocoHeaderStruct, bodyBuffer: Buffer, offset?: number): LocoResponsePacket;
}
