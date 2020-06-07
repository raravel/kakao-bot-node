"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketGetMemberRes = exports.PacketGetMemberReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const __1 = require("..");
const member_struct_1 = require("../talk/struct/member-struct");
class PacketGetMemberReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = __1.Long.ZERO) {
        super();
        this.ChannelId = ChannelId;
    }
    get PacketName() {
        return 'GETMEM';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId
        };
    }
}
exports.PacketGetMemberReq = PacketGetMemberReq;
class PacketGetMemberRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, MemberList = []) {
        super(status);
        this.MemberList = MemberList;
    }
    get PacketName() {
        return 'GETMEM';
    }
    readBodyJson(json) {
        this.MemberList = [];
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
exports.PacketGetMemberRes = PacketGetMemberRes;
//# sourceMappingURL=packet-get-member.js.map