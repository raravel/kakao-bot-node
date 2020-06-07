"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoEncryptedTransformer = void 0;
const stream_1 = require("stream");
const loco_header_struct_1 = require("../../packet/loco-header-struct");
class LocoEncryptedTransformer extends stream_1.Transform {
    constructor(socket) {
        super();
        this.socket = socket;
        this.encryptedBuffer = Buffer.allocUnsafe(0);
        this.currentEncryptedHeader = null;
    }
    get Socket() {
        return this.socket;
    }
    get Crypto() {
        return this.socket.Crypto;
    }
    _destroy(error, callback) {
        this.currentEncryptedHeader = null;
        this.encryptedBuffer = Buffer.allocUnsafe(0);
        super._destroy(error, callback);
    }
    _transform(chunk, encoding, callback) {
        this.encryptedBuffer = Buffer.concat([this.encryptedBuffer, chunk]);
        if (!this.currentEncryptedHeader && this.encryptedBuffer.length > LocoEncryptedTransformer.ENCRYPTED_HEADER_SIZE) {
            this.currentEncryptedHeader = new loco_header_struct_1.LocoEncryptedHeaderStruct();
            this.currentEncryptedHeader.EncryptedSize = this.encryptedBuffer.readInt32LE(0);
        }
        if (this.currentEncryptedHeader) {
            let encryptedPacketSize = LocoEncryptedTransformer.ENCRYPTED_HEADER_SIZE + this.currentEncryptedHeader.EncryptedSize;
            if (this.encryptedBuffer.length >= encryptedPacketSize) {
                let iv = this.encryptedBuffer.slice(LocoEncryptedTransformer.ENCRYPTED_HEADER_SIZE, LocoEncryptedTransformer.ENCRYPTED_HEADER_SIZE + LocoEncryptedTransformer.IV_SIZE);
                let encryptedBodyBuffer = this.encryptedBuffer.slice(LocoEncryptedTransformer.ENCRYPTED_HEADER_SIZE + LocoEncryptedTransformer.IV_SIZE, encryptedPacketSize);
                let decrypted = this.Crypto.toDecryptedPacketBuffer(encryptedBodyBuffer, iv);
                let newBuf = Buffer.allocUnsafe(this.encryptedBuffer.length - encryptedPacketSize);
                this.encryptedBuffer.copy(newBuf, 0, encryptedPacketSize);
                this.encryptedBuffer = Buffer.allocUnsafe(0);
                this.currentEncryptedHeader = null;
                this.push(decrypted);
                this._transform(newBuf);
            }
        }
        if (callback)
            callback();
    }
}
exports.LocoEncryptedTransformer = LocoEncryptedTransformer;
LocoEncryptedTransformer.ENCRYPTED_HEADER_SIZE = 4;
LocoEncryptedTransformer.IV_SIZE = 16;
//# sourceMappingURL=loco-encrypted-transformer.js.map