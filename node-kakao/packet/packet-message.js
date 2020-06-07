"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMessageRes = exports.PacketMessageWriteRes = exports.PacketMessageWriteReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const chat_type_1 = require("../talk/chat/chat-type");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
const json_util_1 = require("../util/json-util");
const bson_1 = require("bson");
class PacketMessageWriteReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(MessageId = 0, ChannelId = bson_1.Long.ZERO, Text = '', Type = chat_type_1.ChatType.Text, NoSeen = false, Extra = '') {
        super();
        this.MessageId = MessageId;
        this.ChannelId = ChannelId;
        this.Text = Text;
        this.Type = Type;
        this.NoSeen = NoSeen;
        this.Extra = Extra;
    }
    get PacketName() {
        return 'WRITE';
    }
    toBodyJson() {
        let obj = {
            'chatId': this.ChannelId,
            'msgId': this.MessageId,
            'msg': this.Text,
            'type': this.Type,
            'noSeen': this.NoSeen
        };
        if (this.Extra !== '') {
            obj.extra = this.Extra;
        }
        return obj;
    }
}
exports.PacketMessageWriteReq = PacketMessageWriteReq;
class PacketMessageWriteRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, MessageId = 0, ChannelId = bson_1.Long.ZERO, LogId = bson_1.Long.ZERO, PrevLogId = bson_1.Long.ZERO, SenderNickname = '', SendTime = -1) {
        super(status);
        this.MessageId = MessageId;
        this.ChannelId = ChannelId;
        this.LogId = LogId;
        this.PrevLogId = PrevLogId;
        this.SenderNickname = SenderNickname;
        this.SendTime = SendTime;
    }
    get PacketName() {
        return 'WRITE';
    }
    readBodyJson(body) {
        this.MessageId = body['msgId'];
        this.ChannelId = json_util_1.JsonUtil.readLong(body['chatId']);
        this.LogId = json_util_1.JsonUtil.readLong(body['logId']);
        this.PrevLogId = json_util_1.JsonUtil.readLong(body['prevId']);
        this.SendTime = body['sendAt'];
    }
}
exports.PacketMessageWriteRes = PacketMessageWriteRes;
class PacketMessageRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.fromNumber(-1), SenderNickname = '', Chatlog = new chatlog_struct_1.ChatlogStruct(), NoSeen = false, PushAlert = false) {
        super(status);
        this.ChannelId = ChannelId;
        this.SenderNickname = SenderNickname;
        this.Chatlog = Chatlog;
        this.NoSeen = NoSeen;
        this.PushAlert = PushAlert;
    }
    get PacketName() {
        return 'MSG';
    }
    readBodyJson(body) {
        this.ChannelId = json_util_1.JsonUtil.readLong(body['chatId']);
        this.SenderNickname = body['authorNickname'];
        this.PushAlert = body['pushAlert'];
        this.NoSeen = body['noSeen'];
        if (body['chatLog']) {
            this.Chatlog.fromJson(body['chatLog']);
        }
    }
}
exports.PacketMessageRes = PacketMessageRes;
//# sourceMappingURL=packet-message.js.map