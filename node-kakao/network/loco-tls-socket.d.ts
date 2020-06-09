/// <reference types="node" />
import * as tls from "tls";
import { LocoSocket } from "./loco-socket";
export declare class LocoTLSSocket extends LocoSocket<tls.TLSSocket> {
    constructor(host: string, port: number, keepAlive: boolean);
    protected createSocketConnection(host: string, port: number, callback: () => void): tls.TLSSocket;
    protected onEnd(buffer: Buffer): void;
    protected onError(e: any): void;
}
