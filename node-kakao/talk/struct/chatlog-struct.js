"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatlogStruct = void 0;
const chat_type_1 = require("../chat/chat-type");
const json_util_1 = require("../../util/json-util");
const bson_1 = require("bson");
class ChatlogStruct {
    constructor(LogId = bson_1.Long.ZERO, PrevLogId = bson_1.Long.ZERO, SenderId = bson_1.Long.ZERO, ChannelId = bson_1.Long.ZERO, Type = chat_type_1.ChatType.Text, Text = '', SendTime = -1, RawAttachment = '', MessageId = 0) {
        this.LogId = LogId;
        this.PrevLogId = PrevLogId;
        this.SenderId = SenderId;
        this.ChannelId = ChannelId;
        this.Type = Type;
        this.Text = Text;
        this.SendTime = SendTime;
        this.RawAttachment = RawAttachment;
        this.MessageId = MessageId;
    }
    fromJson(rawJson) {
        this.LogId = json_util_1.JsonUtil.readLong(rawJson['logId']);
        this.PrevLogId = json_util_1.JsonUtil.readLong(rawJson['prevId']);
        this.SenderId = json_util_1.JsonUtil.readLong(rawJson['authorId']);
        this.ChannelId = json_util_1.JsonUtil.readLong(rawJson['chatId']);
        this.MessageId = parseInt(rawJson['msgId'], 10);
        this.Type = rawJson['type'];
        this.Text = rawJson['message'] || '';
        this.RawAttachment = rawJson['attachment'] || '{}';
        this.SendTime = rawJson['sendAt'];
    }
    toJson() {
        return {
            'logId': this.LogId,
            'prevId': this.PrevLogId,
            'authorId': this.SenderId,
            'chatId': this.ChannelId,
            'msgId': this.MessageId,
            't': this.Type,
            'message': this.Text,
            'attachment': this.RawAttachment,
            'sendAt': this.SendTime
        };
    }
}
exports.ChatlogStruct = ChatlogStruct;
//# sourceMappingURL=chatlog-struct.js.map