"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketKickMemberRes = exports.PacketKickMemberReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
const json_util_1 = require("../util/json-util");
class PacketKickMemberReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkId = bson_1.Long.ZERO, ChannelId = bson_1.Long.ZERO, MemberId = bson_1.Long.ZERO) {
        super();
        this.LinkId = LinkId;
        this.ChannelId = ChannelId;
        this.MemberId = MemberId;
    }
    get PacketName() {
        return 'KICKMEM';
    }
    toBodyJson() {
        let obj = {
            'li': this.LinkId,
            'c': this.ChannelId,
            'mid': this.MemberId,
        };
        return obj;
    }
}
exports.PacketKickMemberReq = PacketKickMemberReq;
class PacketKickMemberRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, MemberId = bson_1.Long.ZERO, Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.ChannelId = ChannelId;
        this.MemberId = MemberId;
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'KICKMEM';
    }
    readBodyJson(body) {
        this.ChannelId = json_util_1.JsonUtil.readLong(body['chatId']);
        this.MemberId = json_util_1.JsonUtil.readLong(body['kid']);
        if (body['chatLog'])
            this.Chatlog.fromJson(body['chatLog']);
    }
}
exports.PacketKickMemberRes = PacketKickMemberRes;
//# sourceMappingURL=packet-kick-member.js.map