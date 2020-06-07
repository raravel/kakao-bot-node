"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBsonResponsePacket = exports.DefaultBsonRequestPacket = exports.LocoBsonResponsePacket = exports.LocoBsonRequestPacket = void 0;
const Bson = require("bson");
const loco_packet_base_1 = require("./loco-packet-base");
class LocoBsonRequestPacket {
    constructor() {
        this.resolveList = [];
    }
    get StatusCode() {
        return loco_packet_base_1.StatusCode.SUCCESS;
    }
    get BodyType() {
        return 0;
    }
    writeBody() {
        return Bson.serialize(this.toBodyJson());
    }
    onResponse(packet) {
        this.resolveList.forEach(resolve => resolve(packet));
        this.resolveList = [];
    }
    submitResponseTicket() {
        let promise = new Promise((resolve, reject) => { this.resolveList.push(resolve); });
        return promise;
    }
}
exports.LocoBsonRequestPacket = LocoBsonRequestPacket;
class LocoBsonResponsePacket {
    constructor(headerStatus, status = 0) {
        this.headerStatus = headerStatus;
        this.status = status;
    }
    get StatusCode() {
        return this.status;
    }
    get HeaderStatus() {
        return this.headerStatus;
    }
    get BodyType() {
        return 0;
    }
    readBody(buffer) {
        let json = Bson.deserialize(buffer, {
            promoteLongs: false
        });
        this.status = json['status'] || loco_packet_base_1.StatusCode.SUCCESS;
        this.readBodyJson(json);
    }
}
exports.LocoBsonResponsePacket = LocoBsonResponsePacket;
class DefaultBsonRequestPacket extends LocoBsonRequestPacket {
    constructor(packetName, content = {}) {
        super();
        this.packetName = packetName;
        this.content = content;
    }
    get PacketName() {
        return this.packetName;
    }
    toBodyJson() {
        return this.content;
    }
}
exports.DefaultBsonRequestPacket = DefaultBsonRequestPacket;
class DefaultBsonResponsePacket extends LocoBsonResponsePacket {
    constructor(headerStatus, packetName) {
        super(headerStatus);
        this.packetName = packetName;
        this.content = {};
    }
    get PacketName() {
        return this.packetName;
    }
    readBodyJson(rawJson) {
        this.content = rawJson;
    }
}
exports.DefaultBsonResponsePacket = DefaultBsonResponsePacket;
//# sourceMappingURL=loco-bson-packet.js.map