"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoTLSSocket = void 0;
const tls = require("tls");
const loco_socket_1 = require("./loco-socket");
class LocoTLSSocket extends loco_socket_1.LocoSocket {
    constructor(host, port, keepAlive) {
        super(host, port, keepAlive);
    }
    createSocketConnection(host, port, callback) {
        return tls.connect({
            host: host,
            port: port,
            timeout: 0
        }, callback);
    }
    onEnd(buffer) {
    }
    onError(e) {
    }
}
exports.LocoTLSSocket = LocoTLSSocket;
//# sourceMappingURL=loco-tls-socket.js.map