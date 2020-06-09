/// <reference types="node" />
import { Writable } from "stream";
import { LocoSocket } from "../loco-socket";
export declare class LocoPacketResolver extends Writable {
    private socket;
    static readonly HEADER_SIZE: number;
    private currentHeader;
    private packetBuffer;
    constructor(socket: LocoSocket<any>);
    get Socket(): LocoSocket<any>;
    _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
    _write(chunk: Buffer, encoding?: string, callback?: (e?: Error) => void): void;
}
