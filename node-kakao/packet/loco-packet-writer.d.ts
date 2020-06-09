/// <reference types="node" />
import { LocoRequestPacket } from "./loco-packet-base";
export declare class LocoPacketWriter {
    private packetCount;
    constructor();
    get CurrentPacketId(): number;
    set CurrentPacketId(value: number);
    getNextPacketId(): number;
    createHeaderBuffer(packet: LocoRequestPacket, bodySize: number): Buffer;
    toBuffer(packet: LocoRequestPacket, buffer?: Buffer, offset?: number): Buffer;
}
