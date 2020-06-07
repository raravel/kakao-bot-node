"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketGetConfRes = exports.PacketGetConfReq = void 0;
const kakao_api_1 = require("../kakao-api");
const loco_bson_packet_1 = require("./loco-bson-packet");
class PacketGetConfReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(NetworkMccMnc = '', Os = kakao_api_1.KakaoAPI.Agent, model = '') {
        super();
        this.NetworkMccMnc = NetworkMccMnc;
        this.Os = Os;
        this.model = model;
    }
    get PacketName() {
        return 'GETCONF';
    }
    toBodyJson() {
        return {
            MCCMNC: this.NetworkMccMnc,
            os: this.Os,
            model: this.model
        };
    }
}
exports.PacketGetConfReq = PacketGetConfReq;
class PacketGetConfRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, HostList = [], PortList = [], Revision = 0) {
        super(status);
        this.HostList = HostList;
        this.PortList = PortList;
        this.Revision = Revision;
    }
    get PacketName() {
        return 'GETCONF';
    }
    readBodyJson(body) {
        this.HostList = [];
        this.PortList = [];
        let hostList = body['ticket']['lsl'];
        let portList = body['wifi']['ports'];
        for (let host of hostList) {
            this.HostList.push(host);
        }
        for (let port of portList) {
            this.PortList.push(port);
        }
        if (body['revision']) {
            this.Revision = body['revision'];
        }
    }
}
exports.PacketGetConfRes = PacketGetConfRes;
//# sourceMappingURL=packet-get-conf.js.map