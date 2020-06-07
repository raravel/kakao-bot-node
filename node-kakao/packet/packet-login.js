"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketLoginRes = exports.PacketLoginReq = void 0;
const kakao_api_1 = require("../kakao-api");
const loco_bson_packet_1 = require("./loco-bson-packet");
const chatdata_struct_1 = require("../talk/struct/chatdata-struct");
const json_util_1 = require("../util/json-util");
const bson_1 = require("bson");
class PacketLoginReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(DeviceUUID = '', OAuthToken = '', Appver = kakao_api_1.KakaoAPI.InternalAppVersion, Os = kakao_api_1.KakaoAPI.Agent, NetType = 0, NetworkMccMnc = '', Language = 'ko', Revision = 0, RevisionData = null, ChatIds = [], MaxIds = [], LastTokenId = bson_1.Long.ZERO, LastChatId = bson_1.Long.ZERO, Lbk = 0, Bg = false) {
        super();
        this.DeviceUUID = DeviceUUID;
        this.OAuthToken = OAuthToken;
        this.Appver = Appver;
        this.Os = Os;
        this.NetType = NetType;
        this.NetworkMccMnc = NetworkMccMnc;
        this.Language = Language;
        this.Revision = Revision;
        this.RevisionData = RevisionData;
        this.ChatIds = ChatIds;
        this.MaxIds = MaxIds;
        this.LastTokenId = LastTokenId;
        this.LastChatId = LastChatId;
        this.Lbk = Lbk;
        this.Bg = Bg;
    }
    get PacketName() {
        return 'LOGINLIST';
    }
    toBodyJson() {
        let obj = {
            'appVer': this.Appver,
            'prtVer': '1',
            'os': this.Os,
            'lang': this.Language,
            'duuid': this.DeviceUUID,
            'oauthToken': this.OAuthToken,
            'dtype': 1,
            'ntype': this.NetType,
            'MCCMNC': this.NetworkMccMnc,
            'revision': this.Revision,
            'rp': null,
            'chatIds': this.ChatIds,
            'maxIds': this.MaxIds,
            'lastTokenId': this.LastTokenId,
            'lbk': this.Lbk,
            'bg': this.Bg
        };
        if (this.LastChatId.toNumber() !== 0) {
            obj['lastChatId'] = this.LastChatId;
        }
        return obj;
    }
}
exports.PacketLoginReq = PacketLoginReq;
class PacketLoginRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, UserId = bson_1.Long.ZERO, Revision = 0, OpenChatToken = 0, RevisionDetail = '', ChatDataList = []) {
        super(status);
        this.UserId = UserId;
        this.Revision = Revision;
        this.OpenChatToken = OpenChatToken;
        this.RevisionDetail = RevisionDetail;
        this.ChatDataList = ChatDataList;
    }
    get PacketName() {
        return 'LOGINLIST';
    }
    readBodyJson(body) {
        this.UserId = json_util_1.JsonUtil.readLong(body['userId']);
        this.Revision = body['revision'];
        this.RevisionDetail = body['revisionInfo'];
        this.OpenChatToken = body['ltk'];
        this.ChatDataList = [];
        if (body['chatDatas']) {
            let chatDataList = body['chatDatas'];
            for (let rawChatData of chatDataList) {
                let dataStruct = new chatdata_struct_1.ChatDataStruct();
                dataStruct.fromJson(rawChatData);
                this.ChatDataList.push(dataStruct);
            }
        }
    }
}
exports.PacketLoginRes = PacketLoginRes;
//# sourceMappingURL=packet-login.js.map