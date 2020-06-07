"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoPacketWriter = void 0;
class LocoPacketWriter {
    constructor() {
        this.packetCount = 0;
    }
    get CurrentPacketId() {
        return this.packetCount;
    }
    set CurrentPacketId(value) {
        this.packetCount = value;
    }
    getNextPacketId() {
        return ++this.packetCount;
    }
    createHeaderBuffer(packet, bodySize) {
        let buffer = Buffer.allocUnsafe(22);
        buffer.writeUInt32LE(this.getNextPacketId(), 0);
        buffer.writeUInt16LE(packet.StatusCode, 4);
        let written = buffer.write(packet.PacketName, 6, 'utf8');
        buffer.fill(0, 6 + written, 17);
        buffer.writeInt8(packet.BodyType, 17);
        buffer.writeUInt32LE(bodySize, 18);
        return buffer;
    }
    toBuffer(packet, buffer, offset = 0) {
        let bodyBuffer = packet.writeBody();
        let bodySize = bodyBuffer.length;
        let size = 22 + bodySize;
        if (buffer && buffer.length < offset + size) {
            throw new Error(`Provided buffer is smaller than required. Size: ${buffer.length}, Required: ${offset + size}`);
        }
        else {
            buffer = Buffer.allocUnsafe(size + offset);
        }
        let headerBuffer = this.createHeaderBuffer(packet, bodySize);
        headerBuffer.copy(buffer, offset, 0);
        bodyBuffer.copy(buffer, offset + 22, 0);
        return buffer;
    }
}
exports.LocoPacketWriter = LocoPacketWriter;
//# sourceMappingURL=loco-packet-writer.js.map