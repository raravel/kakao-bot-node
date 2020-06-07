"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoKickoutType = exports.PacketKickoutRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
class PacketKickoutRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, Reason = -1) {
        super(status);
        this.Reason = Reason;
    }
    get PacketName() {
        return 'KICKOUT';
    }
    readBodyJson(body) {
        this.Reason = body['reason'];
    }
}
exports.PacketKickoutRes = PacketKickoutRes;
var LocoKickoutType;
(function (LocoKickoutType) {
    LocoKickoutType[LocoKickoutType["UNKNOWN"] = -1] = "UNKNOWN";
    LocoKickoutType[LocoKickoutType["LOGIN_ANOTHER"] = 0] = "LOGIN_ANOTHER";
    LocoKickoutType[LocoKickoutType["ACCOUNT_DELETED"] = 1] = "ACCOUNT_DELETED";
})(LocoKickoutType = exports.LocoKickoutType || (exports.LocoKickoutType = {}));
//# sourceMappingURL=packet-kickout.js.map