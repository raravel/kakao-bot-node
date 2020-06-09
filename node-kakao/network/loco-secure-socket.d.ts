/// <reference types="node" />
import { LocoSocket } from "./loco-socket";
import { CryptoManager } from "../secure/crypto-manager";
import * as net from "net";
import { LocoRequestPacket } from "../packet/loco-packet-base";
export declare class LocoSecureSocket extends LocoSocket<net.Socket> {
    private crypto;
    private handshaked;
    constructor(host: string, port: number, keepAlive: boolean);
    get Handshaked(): boolean;
    protected pipeTranformation(socket: net.Socket): void;
    protected structPacketToBuffer(packet: LocoRequestPacket): Buffer;
    sendPacket(packet: LocoRequestPacket): Promise<boolean>;
    handshake(): Promise<boolean>;
    protected sendHandshakePacket(): Promise<boolean>;
    protected createSocketConnection(host: string, port: number, callback: () => void): net.Socket;
    get Crypto(): CryptoManager;
    protected onEnd(buffer: Buffer): void;
    protected onError(e: any): void;
}
