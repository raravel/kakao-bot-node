"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketChatMemberRes = exports.PacketChatMemberReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const member_struct_1 = require("../talk/struct/member-struct");
const json_util_1 = require("../util/json-util");
const bson_1 = require("bson");
class PacketChatMemberReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO, UserIdLIst = []) {
        super();
        this.ChannelId = ChannelId;
        this.UserIdLIst = UserIdLIst;
    }
    get PacketName() {
        return 'MEMBER';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId,
            'memberIds': this.UserIdLIst
        };
    }
}
exports.PacketChatMemberReq = PacketChatMemberReq;
class PacketChatMemberRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, MemberList = []) {
        super(status);
        this.ChannelId = ChannelId;
        this.MemberList = MemberList;
    }
    get PacketName() {
        return 'MEMBER';
    }
    readBodyJson(rawData) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['chatId']);
        this.MemberList = [];
        if (rawData['members']) {
            let memberList = rawData['members'];
            for (let rawMemberStruct of memberList) {
                let memberStruct = new member_struct_1.MemberStruct();
                memberStruct.fromJson(rawMemberStruct);
                this.MemberList.push(memberStruct);
            }
        }
    }
}
exports.PacketChatMemberRes = PacketChatMemberRes;
//# sourceMappingURL=packet-chat-member.js.map