/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
import { LocoSecureSocket } from "../loco-secure-socket";
export declare class LocoEncryptedTransformer extends Transform {
    private socket;
    static readonly ENCRYPTED_HEADER_SIZE: number;
    static readonly IV_SIZE: number;
    private currentEncryptedHeader;
    private encryptedBuffer;
    constructor(socket: LocoSecureSocket);
    get Socket(): LocoSecureSocket;
    get Crypto(): import("../..").CryptoManager;
    _destroy(error: Error | null, callback: (error: Error | null) => void): void;
    _transform(chunk: Buffer, encoding?: string, callback?: TransformCallback): void;
}
