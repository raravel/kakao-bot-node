"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoSecureSocket = void 0;
const loco_socket_1 = require("./loco-socket");
const crypto_manager_1 = require("../secure/crypto-manager");
const net = require("net");
const loco_encrypted_transformer_1 = require("./stream/loco-encrypted-transformer");
const loco_packet_resolver_1 = require("./stream/loco-packet-resolver");
class LocoSecureSocket extends loco_socket_1.LocoSocket {
    constructor(host, port, keepAlive) {
        super(host, port, keepAlive);
        this.handshaked = false;
        this.crypto = new crypto_manager_1.CryptoManager();
    }
    get Handshaked() {
        return this.handshaked;
    }
    pipeTranformation(socket) {
        socket.pipe(new loco_encrypted_transformer_1.LocoEncryptedTransformer(this)).pipe(new loco_packet_resolver_1.LocoPacketResolver(this));
    }
    structPacketToBuffer(packet) {
        let packetBuffer = this.Writer.toBuffer(packet);
        let encryptedPacketBuffer = this.Crypto.toEncryptedPacket(packetBuffer, this.crypto.randomCipherIV());
        return encryptedPacketBuffer;
    }
    async sendPacket(packet) {
        if (!this.Connected) {
            return false;
        }
        if (!this.handshaked) {
            await this.sendHandshakePacket();
        }
        return super.sendPacket(packet);
    }
    async handshake() {
        if (!this.Connected || this.handshaked) {
            return false;
        }
        return this.sendHandshakePacket();
    }
    async sendHandshakePacket() {
        this.handshaked = true;
        let keyBuffer = this.Crypto.getRSAEncryptedKey();
        let handshakeHead = Buffer.allocUnsafe(12);
        handshakeHead.writeUInt32LE(keyBuffer.length, 0);
        handshakeHead.writeUInt32LE(12, 4);
        handshakeHead.writeUInt32LE(2, 8);
        let handshakeBuffer = Buffer.concat([handshakeHead, keyBuffer]);
        return this.sendBuffer(handshakeBuffer);
    }
    createSocketConnection(host, port, callback) {
        this.handshaked = false;
        return net.connect({
            host: host,
            port: port,
            timeout: 15000
        }, callback).setKeepAlive(this.KeepAlive).setNoDelay(true);
    }
    get Crypto() {
        return this.crypto;
    }
    onEnd(buffer) {
    }
    onError(e) {
        console.log('error: ' + e);
    }
}
exports.LocoSecureSocket = LocoSecureSocket;
//# sourceMappingURL=loco-secure-socket.js.map