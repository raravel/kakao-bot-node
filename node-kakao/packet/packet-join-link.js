"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketJoinLinkRes = exports.PacketJoinLinkReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const __1 = require("..");
const member_struct_1 = require("../talk/struct/member-struct");
const open_link_struct_1 = require("../talk/struct/open-link-struct");
const chat_info_struct_1 = require("../talk/struct/chat-info-struct");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
class PacketJoinLinkReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkId = __1.Long.ZERO, Ref = '', ChannelKey = '', ProfileType = __1.OpenchatProfileType.MAIN, Nickname = '', ProfilePath = '', ProfileLinkId = __1.Long.ZERO) {
        super();
        this.LinkId = LinkId;
        this.Ref = Ref;
        this.ChannelKey = ChannelKey;
        this.ProfileType = ProfileType;
        this.Nickname = Nickname;
        this.ProfilePath = ProfilePath;
        this.ProfileLinkId = ProfileLinkId;
    }
    get PacketName() {
        return 'JOINLINK';
    }
    toBodyJson() {
        let obj = {
            'li': this.LinkId,
            'ref': this.Ref,
            'tk': this.ChannelKey,
            'ptp': this.ProfileType
        };
        if (this.ProfileType === __1.OpenchatProfileType.KAKAO_ANON) {
            if (this.Nickname !== '')
                obj['nn'] = this.Nickname;
            if (this.ProfilePath !== '')
                obj['pp'] = this.ProfilePath;
        }
        else if (this.ProfileType === __1.OpenchatProfileType.OPEN_PROFILE) {
            obj['pli'] = this.ProfileLinkId;
        }
        return obj;
    }
}
exports.PacketJoinLinkReq = PacketJoinLinkReq;
class PacketJoinLinkRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, LinkInfo = new open_link_struct_1.OpenLinkStruct(), OpenMember = new member_struct_1.MemberStruct(), ChatInfo = new chat_info_struct_1.ChatInfoStruct(), Chatlog = new chatlog_struct_1.ChatlogStruct()) {
        super(status);
        this.LinkInfo = LinkInfo;
        this.OpenMember = OpenMember;
        this.ChatInfo = ChatInfo;
        this.Chatlog = Chatlog;
    }
    get PacketName() {
        return 'JOINLINK';
    }
    readBodyJson(rawData) {
        if (rawData['ol'])
            this.LinkInfo.fromJson(rawData['ol']);
        if (rawData['olu'])
            this.OpenMember.fromJson(rawData['olu']);
        if (rawData['chatRoom'])
            this.ChatInfo.fromJson(rawData['chatRoom']);
        if (rawData['chatLog'])
            this.Chatlog.fromJson(rawData['chatLog']);
    }
}
exports.PacketJoinLinkRes = PacketJoinLinkRes;
//# sourceMappingURL=packet-join-link.js.map