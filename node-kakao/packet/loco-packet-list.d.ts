import { LocoRequestPacket, LocoResponsePacket } from "./loco-packet-base";
export declare class LocoPacketList {
    private static requestPacketMap;
    private static responsePacketMap;
    private static defaultBodyReqPacketMap;
    private static defaultBodyResPacketMap;
    static init(): void;
    protected static initReqMap(): void;
    protected static initResMap(): void;
    static hasReqPacket(name: string): boolean;
    static hasResPacket(name: string): boolean;
    static hasReqBodyType(type: number): boolean;
    static hasResBodyType(type: number): boolean;
    static getReqPacketByName(name: string): LocoRequestPacket;
    static getResPacketByName(name: string, status: number): LocoResponsePacket;
    static getDefaultReqPacket(bodyType: number, packetName: string): LocoRequestPacket;
    static getDefaultResPacket(bodyType: number, packetName: string, status: number): LocoResponsePacket;
}
