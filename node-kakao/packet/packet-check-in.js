"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketCheckInRes = exports.PacketCheckInReq = void 0;
const kakao_api_1 = require("../kakao-api");
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
class PacketCheckInReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(UserId = bson_1.Long.ZERO, Os = kakao_api_1.KakaoAPI.Agent, NetType = 0, Appver = kakao_api_1.KakaoAPI.InternalAppVersion, NetworkMccMnc = '', language = 'ko', CountryIso = 'KR', UseSub = true) {
        super();
        this.UserId = UserId;
        this.Os = Os;
        this.NetType = NetType;
        this.Appver = Appver;
        this.NetworkMccMnc = NetworkMccMnc;
        this.language = language;
        this.CountryIso = CountryIso;
        this.UseSub = UseSub;
    }
    get PacketName() {
        return 'CHECKIN';
    }
    toBodyJson() {
        return {
            userId: this.UserId,
            os: this.Os,
            ntype: this.NetType,
            appVer: this.Appver,
            MCCMNC: this.NetworkMccMnc,
            lang: this.language,
            useSub: this.UseSub
        };
    }
}
exports.PacketCheckInReq = PacketCheckInReq;
class PacketCheckInRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, Host = '', Port = 0, CacheExpire = -1) {
        super(status);
        this.Host = Host;
        this.Port = Port;
        this.CacheExpire = CacheExpire;
    }
    get PacketName() {
        return 'CHECKIN';
    }
    readBodyJson(body) {
        this.Host = body['host'];
        this.Port = body['port'];
        this.CacheExpire = body['cacheExpire'];
    }
}
exports.PacketCheckInRes = PacketCheckInRes;
//# sourceMappingURL=packet-check-in.js.map