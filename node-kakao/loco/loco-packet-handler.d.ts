import { LocoResponsePacket, LocoRequestPacket } from "../packet/loco-packet-base";
export interface LocoPacketHandler {
    onRequest(packetId: number, packet: LocoRequestPacket): void;
    onResponse(packetId: number, packet: LocoResponsePacket, reqPacket?: LocoRequestPacket): void;
    onDisconnected(): void;
}
