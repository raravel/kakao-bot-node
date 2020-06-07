"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoManager = void 0;
const crypto = require("crypto");
const kakao_api_1 = require("../kakao-api");
const Forge = require("node-forge");
class CryptoManager {
    constructor(key = crypto.randomBytes(16)) {
        this.key = key;
    }
    get Key() {
        return this.key;
    }
    get PEMPublicKey() {
        return kakao_api_1.KakaoAPI.LocoPEMPublicKey;
    }
    bufferToBinaryString(buffer) {
        return buffer.toString('binary');
    }
    binaryStringToBuffer(str) {
        return Buffer.from(str, 'binary');
    }
    toAESEncrypted(buffer, iv) {
        let cipher = Forge.cipher.createCipher('AES-CFB', this.bufferToBinaryString(this.key));
        cipher.start({
            iv: Forge.util.createBuffer(iv)
        });
        cipher.update(Forge.util.createBuffer(buffer));
        cipher.finish();
        return this.binaryStringToBuffer(cipher.output.data);
    }
    toAESDecrypted(buffer, iv) {
        let cipher = Forge.cipher.createDecipher('AES-CFB', this.bufferToBinaryString(this.key));
        cipher.start({
            iv: Forge.util.createBuffer(iv)
        });
        cipher.update(Forge.util.createBuffer(buffer));
        cipher.finish();
        return this.binaryStringToBuffer(cipher.output.data);
    }
    toRSAEncrypted(buffer) {
        let publicKey = Forge.pki.publicKeyFromPem(this.PEMPublicKey);
        let encrypted = publicKey.encrypt(this.bufferToBinaryString(buffer), "RSA-OAEP", {
            md: Forge.md.sha1.create(),
            mgf: Forge.mgf.mgf1.create(Forge.md.sha1.create()),
        });
        let encryptedBuffer = this.binaryStringToBuffer(encrypted);
        return encryptedBuffer;
    }
    toEncryptedPacket(packetBuffer, cipherIV) {
        let encryptedBuf = this.toAESEncrypted(packetBuffer, cipherIV);
        let buffer = Buffer.allocUnsafe(encryptedBuf.length + 20);
        buffer.writeUInt32LE(encryptedBuf.length + 16, 0);
        cipherIV.copy(buffer, 4);
        encryptedBuf.copy(buffer, 20);
        return buffer;
    }
    randomCipherIV() {
        return crypto.randomBytes(16);
    }
    toDecryptedPacketBuffer(encryptedPacketBuffer, cipherIV) {
        return this.toAESDecrypted(encryptedPacketBuffer, cipherIV);
    }
    getRSAEncryptedKey() {
        return this.toRSAEncrypted(this.key);
    }
}
exports.CryptoManager = CryptoManager;
//# sourceMappingURL=crypto-manager.js.map