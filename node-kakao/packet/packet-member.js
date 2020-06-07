"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMemberRes = exports.PacketMemberReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const json_util_1 = require("../util/json-util");
const member_struct_1 = require("../talk/struct/member-struct");
class PacketMemberReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO, MemberIdList = []) {
        super();
        this.ChannelId = ChannelId;
        this.MemberIdList = MemberIdList;
    }
    get PacketName() {
        return 'MEMBER';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId,
            'memberIds': this.MemberIdList
        };
    }
}
exports.PacketMemberReq = PacketMemberReq;
class PacketMemberRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, MemberList = []) {
        super(status);
        this.ChannelId = ChannelId;
        this.MemberList = MemberList;
    }
    get PacketName() {
        return 'MEMBER';
    }
    readBodyJson(json) {
        this.MemberList = [];
        this.ChannelId = json_util_1.JsonUtil.readLong(json['chatId']);
        if (json['members']) {
            let memberList = json['members'];
            for (let rawMemberStruct of memberList) {
                let memberStruct = new member_struct_1.MemberStruct();
                memberStruct.fromJson(rawMemberStruct);
                this.MemberList.push(memberStruct);
            }
        }
    }
}
exports.PacketMemberRes = PacketMemberRes;
//# sourceMappingURL=packet-member.js.map