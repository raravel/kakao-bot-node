"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoPacketResolver = void 0;
const stream_1 = require("stream");
class LocoPacketResolver extends stream_1.Writable {
    constructor(socket) {
        super();
        this.socket = socket;
        this.packetBuffer = Buffer.allocUnsafe(0);
        this.currentHeader = null;
    }
    get Socket() {
        return this.socket;
    }
    _destroy(error, callback) {
        this.currentHeader = null;
        this.packetBuffer = Buffer.allocUnsafe(0);
        super._destroy(error, callback);
    }
    _write(chunk, encoding, callback) {
        this.packetBuffer = Buffer.concat([this.packetBuffer, chunk]);
        if (!this.currentHeader && this.packetBuffer.length > LocoPacketResolver.HEADER_SIZE) {
            let headerBuffer = this.packetBuffer.slice(0, LocoPacketResolver.HEADER_SIZE);
            this.currentHeader = this.socket.Reader.structHeader(headerBuffer);
        }
        if (this.currentHeader) {
            let currentPacketSize = LocoPacketResolver.HEADER_SIZE + this.currentHeader.BodySize;
            if (this.packetBuffer.length >= currentPacketSize) {
                let bodyBuffer = this.packetBuffer.slice(LocoPacketResolver.HEADER_SIZE, currentPacketSize);
                let newBuf = Buffer.allocUnsafe(this.packetBuffer.length - currentPacketSize);
                this.packetBuffer.copy(newBuf, 0, currentPacketSize);
                try {
                    let packet = this.socket.Reader.structToPacket(this.currentHeader, bodyBuffer);
                    this.Socket.packetReceived(this.currentHeader.PacketId, packet);
                }
                catch (e) {
                    console.log(`Invalid packet. ${e}`);
                }
                this.packetBuffer = Buffer.allocUnsafe(0);
                this.currentHeader = null;
                this._write(newBuf);
            }
        }
        if (callback)
            callback();
    }
}
exports.LocoPacketResolver = LocoPacketResolver;
LocoPacketResolver.HEADER_SIZE = 22;
//# sourceMappingURL=loco-packet-resolver.js.map