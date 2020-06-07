"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSyncMessageRes = exports.PacketSyncMessageReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const chatlog_struct_1 = require("../talk/struct/chatlog-struct");
class PacketSyncMessageReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(ChannelId = bson_1.Long.ZERO, StartLogId = bson_1.Long.ZERO, Count = 0, CurrentLogId = bson_1.Long.ZERO) {
        super();
        this.ChannelId = ChannelId;
        this.StartLogId = StartLogId;
        this.Count = Count;
        this.CurrentLogId = CurrentLogId;
    }
    get PacketName() {
        return 'SYNCMSG';
    }
    toBodyJson() {
        return {
            'chatId': this.ChannelId,
            'cur': this.StartLogId,
            'cnt': this.Count,
            'max': this.CurrentLogId
        };
    }
}
exports.PacketSyncMessageReq = PacketSyncMessageReq;
class PacketSyncMessageRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, IsOK = false, ChatList = [], LastTokenId = bson_1.Long.ZERO, LinkId = bson_1.Long.ZERO) {
        super(status);
        this.IsOK = IsOK;
        this.ChatList = ChatList;
        this.LastTokenId = LastTokenId;
        this.LinkId = LinkId;
    }
    get PacketName() {
        return 'SYNCMSG';
    }
    readBodyJson(rawJson) {
        this.IsOK = rawJson['isOK'];
        if (rawJson['chatLogs']) {
            for (let rawChatlog of rawJson['chatLogs']) {
                let log = new chatlog_struct_1.ChatlogStruct();
                log.fromJson(rawChatlog);
                this.ChatList.push(log);
            }
        }
        if (rawJson['li'])
            this.LinkId = rawJson['li'];
        this.LastTokenId = rawJson['lastTokenId'];
    }
}
exports.PacketSyncMessageRes = PacketSyncMessageRes;
//# sourceMappingURL=packet-sync-message.js.map