"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoPacketReader = void 0;
const loco_header_struct_1 = require("./loco-header-struct");
const loco_packet_list_1 = require("./loco-packet-list");
class LocoPacketReader {
    constructor() {
        this.latestReadPacketId = -1;
    }
    get LatestReadPacketId() {
        return this.latestReadPacketId;
    }
    structHeader(buffer, offset = 0) {
        let header = new loco_header_struct_1.LocoHeaderStruct();
        header.PacketId = buffer.readInt32LE(offset);
        header.StatusCode = buffer.readInt16LE(offset + 4);
        header.PacketName = buffer.toString('utf8', offset + 6, offset + 16).replace(/\0/g, '');
        header.BodyType = buffer.readInt8(offset + 17);
        header.BodySize = buffer.readInt32LE(offset + 18);
        return header;
    }
    structToPacket(header, bodyBuffer, offset = 0) {
        let bodyBuf = bodyBuffer.slice(offset, offset + header.BodySize);
        let packet;
        if (loco_packet_list_1.LocoPacketList.hasResPacket(header.PacketName)) {
            packet = loco_packet_list_1.LocoPacketList.getResPacketByName(header.PacketName, header.StatusCode);
        }
        else {
            if (loco_packet_list_1.LocoPacketList.hasResBodyType(header.BodyType)) {
                packet = loco_packet_list_1.LocoPacketList.getDefaultResPacket(header.BodyType, header.PacketName, header.StatusCode);
            }
            else {
                throw new Error(`Invalid packet type: ${header.BodyType}`);
            }
        }
        packet.readBody(bodyBuf);
        return packet;
    }
}
exports.LocoPacketReader = LocoPacketReader;
//# sourceMappingURL=loco-packet-reader.js.map