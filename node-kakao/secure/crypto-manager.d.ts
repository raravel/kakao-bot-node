/// <reference types="node" />
export declare class CryptoManager {
    private key;
    constructor(key?: Buffer);
    get Key(): Buffer;
    get PEMPublicKey(): string;
    protected bufferToBinaryString(buffer: Buffer): string;
    protected binaryStringToBuffer(str: string): Buffer;
    toAESEncrypted(buffer: Buffer, iv: Buffer): Buffer;
    toAESDecrypted(buffer: Buffer, iv: Buffer): Buffer;
    toRSAEncrypted(buffer: Buffer): Buffer;
    toEncryptedPacket(packetBuffer: Buffer, cipherIV: Buffer): Buffer;
    randomCipherIV(): Buffer;
    toDecryptedPacketBuffer(encryptedPacketBuffer: Buffer, cipherIV: Buffer): Buffer;
    getRSAEncryptedKey(): Buffer;
}
