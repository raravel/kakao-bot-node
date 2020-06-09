/// <reference types="node" />
import { LocoRequestPacket, LocoResponsePacket, StatusCode } from "./loco-packet-base";
export declare abstract class LocoBsonRequestPacket implements LocoRequestPacket {
    private resolveList;
    get StatusCode(): StatusCode;
    abstract get PacketName(): string;
    get BodyType(): number;
    abstract toBodyJson(): any;
    writeBody(): Buffer;
    onResponse<T extends LocoResponsePacket>(packet: T): void;
    submitResponseTicket<T extends LocoResponsePacket>(): Promise<T>;
}
export declare abstract class LocoBsonResponsePacket implements LocoResponsePacket {
    private headerStatus;
    private status;
    constructor(headerStatus: number, status?: number);
    get StatusCode(): StatusCode;
    get HeaderStatus(): number;
    abstract get PacketName(): string;
    get BodyType(): number;
    abstract readBodyJson(body: any): void;
    readBody(buffer: Buffer): void;
}
export declare class DefaultBsonRequestPacket extends LocoBsonRequestPacket {
    private packetName;
    private content;
    constructor(packetName: string, content?: any);
    get PacketName(): string;
    toBodyJson(): any;
}
export declare class DefaultBsonResponsePacket extends LocoBsonResponsePacket {
    private packetName;
    private content;
    constructor(headerStatus: number, packetName: string);
    get PacketName(): string;
    readBodyJson(rawJson: any): void;
}
