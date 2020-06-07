"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketChatOnRoomRes = exports.PacketChatOnRoomReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const member_struct_1 = require("../talk/struct/member-struct");
const channel_type_1 = require("../talk/chat/channel-type");
const json_util_1 = require("../util/json-util");
const open_link_struct_1 = require("../talk/struct/open-link-struct");
class PacketChatOnRoomReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO, Token = bson_1.Long.ZERO, OpenChatToken = -1) {
        super();
        this.ChannelId = ChannelId;
        this.Token = Token;
        this.OpenChatToken = OpenChatToken;
    }
    get PacketName() {
        return 'CHATONROOM';
    }
    toBodyJson() {
        let obj = {
            'chatId': this.ChannelId,
            'token': this.Token
        };
        if (this.OpenChatToken !== -1)
            obj['opt'] = this.OpenChatToken;
        return obj;
    }
}
exports.PacketChatOnRoomReq = PacketChatOnRoomReq;
class PacketChatOnRoomRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, MemberList = [], Type = channel_type_1.ChannelType.UNKNOWN, WatermarkList = [], OpenChatToken = 0, ClientOpenProfile = null) {
        super(status);
        this.ChannelId = ChannelId;
        this.MemberList = MemberList;
        this.Type = Type;
        this.WatermarkList = WatermarkList;
        this.OpenChatToken = OpenChatToken;
        this.ClientOpenProfile = ClientOpenProfile;
    }
    get PacketName() {
        return 'CHATONROOM';
    }
    readBodyJson(rawData) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        if (rawData['m']) {
            this.MemberList = [];
            for (let rawMem of rawData['m']) {
                let memberStruct = new member_struct_1.MemberStruct();
                memberStruct.fromJson(rawMem);
                this.MemberList.push(memberStruct);
            }
        }
        this.Type = rawData['t'];
        if (rawData['w'])
            this.WatermarkList = rawData['w'];
        this.OpenChatToken = rawData['otk'];
        if (rawData['olu']) {
            this.ClientOpenProfile = new open_link_struct_1.OpenMemberStruct();
            this.ClientOpenProfile.fromJson(rawData['olu']);
        }
        else {
            this.ClientOpenProfile = null;
        }
    }
}
exports.PacketChatOnRoomRes = PacketChatOnRoomRes;
//# sourceMappingURL=packet-chat-on-room.js.map