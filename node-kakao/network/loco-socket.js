"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoSocket = void 0;
const loco_packet_writer_1 = require("../packet/loco-packet-writer");
const loco_packet_reader_1 = require("../packet/loco-packet-reader");
const events_1 = require("events");
const loco_packet_resolver_1 = require("./stream/loco-packet-resolver");
class LocoSocket extends events_1.EventEmitter {
    constructor(host, port, keepAlive = false, packetWriter = new loco_packet_writer_1.LocoPacketWriter(), packetReader = new loco_packet_reader_1.LocoPacketReader()) {
        super();
        this.packetMap = new Map();
        this.host = host;
        this.port = port;
        this.socket = null;
        this.packetWriter = packetWriter;
        this.packetReader = packetReader;
        this.connected = false;
        this.keepAlive = keepAlive;
    }
    get Host() {
        return this.host;
    }
    get Port() {
        return this.port;
    }
    get Socket() {
        return this.socket;
    }
    get Connected() {
        return this.connected;
    }
    get Writer() {
        return this.packetWriter;
    }
    get Reader() {
        return this.packetReader;
    }
    get KeepAlive() {
        return this.keepAlive;
    }
    set KeepAlive(flag) {
        this.keepAlive = flag;
    }
    async connect() {
        if (this.connected) {
            return false;
        }
        await new Promise((resolve, reject) => {
            this.packetMap.clear();
            this.socket = this.createSocketConnection(this.host, this.port, resolve);
            this.pipeTranformation(this.socket);
            this.socket.on('error', this.connectionError.bind(this));
            this.socket.on('end', this.connectionEnded.bind(this));
            this.onConnect();
        });
        this.connected = true;
        this.onConnected();
        return true;
    }
    pipeTranformation(socket) {
        socket.pipe(new loco_packet_resolver_1.LocoPacketResolver(this));
    }
    onConnect() {
    }
    onConnected() {
    }
    disconnect() {
        if (!this.connected) {
            return false;
        }
        this.onDisconnect();
        this.socket.destroy();
        this.socket = null;
        this.packetMap.clear();
        this.connected = false;
        this.onDisconnected();
        return true;
    }
    onDisconnect() {
    }
    onDisconnected() {
        this.emit('disconnected');
    }
    connectionError(e) {
        this.onError(e);
        this.disconnect();
    }
    connectionEnded(buffer) {
        this.onEnd(buffer);
        this.disconnect();
    }
    packetReceived(packetId, packet) {
        if (this.packetMap.has(packetId)) {
            let requestPacket = this.packetMap.get(packetId);
            this.packetMap.delete(packetId);
            requestPacket.onResponse(packet);
            this.emit('packet', packetId, packet, requestPacket);
        }
        else {
            this.emit('packet', packetId, packet);
        }
        if (!this.keepAlive) {
            this.disconnect();
        }
    }
    structPacketToBuffer(packet) {
        return this.Writer.toBuffer(packet);
    }
    async sendPacket(packet) {
        if (!this.connected) {
            return false;
        }
        let buffer = this.structPacketToBuffer(packet);
        this.packetMap.set(this.Writer.CurrentPacketId, packet);
        return this.sendBuffer(buffer);
    }
    async sendBuffer(buffer) {
        if (!this.connected) {
            return false;
        }
        return new Promise((resolve, reject) => this.socket.write(buffer, (e) => {
            if (e) {
                reject(e);
            }
            else {
                resolve(true);
            }
        }));
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.LocoSocket = LocoSocket;
//# sourceMappingURL=loco-socket.js.map