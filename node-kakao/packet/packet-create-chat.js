"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketCreateChatRes = exports.PacketCreateChatReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chat_info_struct_1 = require("../talk/struct/chat-info-struct");
const json_util_1 = require("../util/json-util");
class PacketCreateChatReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(UserIdList = [], Nickname = '', ProfileURL = '') {
        super();
        this.UserIdList = UserIdList;
        this.Nickname = Nickname;
        this.ProfileURL = ProfileURL;
    }
    get PacketName() {
        return 'CREATE';
    }
    toBodyJson() {
        let obj = {
            'memberIds': this.UserIdList
        };
        if (this.Nickname !== '')
            obj['nickname'] = this.Nickname;
        if (this.ProfileURL !== '')
            obj['profileImageUrl'] = this.ProfileURL;
        return obj;
    }
}
exports.PacketCreateChatReq = PacketCreateChatReq;
class PacketCreateChatRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, ChatInfo = new chat_info_struct_1.ChatInfoStruct()) {
        super(status);
        this.ChannelId = ChannelId;
        this.ChatInfo = ChatInfo;
    }
    get PacketName() {
        return 'CREATE';
    }
    readBodyJson(rawBody) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawBody['chatId']);
        this.ChatInfo.fromJson(rawBody['chatRoom']);
    }
}
exports.PacketCreateChatRes = PacketCreateChatRes;
//# sourceMappingURL=packet-create-chat.js.map