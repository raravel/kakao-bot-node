"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentTemplate = void 0;
const json_util_1 = require("../../../util/json-util");
const chat_builder_1 = require("../chat-builder");
class AttachmentTemplate {
    constructor(attachment, ...textFormat) {
        this.attachment = attachment;
        let msg = chat_builder_1.ChatBuilder.buildMessage(...textFormat);
        this.packetText = msg.text;
        this.textExtra = msg.extra;
    }
    get Attachment() {
        return this.attachment;
    }
    set Attachment(attachment) {
        this.attachment = attachment;
    }
    get Text() {
        return this.packetText;
    }
    setText(...textFormat) {
        let msg = chat_builder_1.ChatBuilder.buildMessage(...textFormat);
        this.packetText = msg.text;
        this.textExtra = msg.extra;
    }
    get Valid() {
        return true;
    }
    getMessageType() {
        return this.attachment.RequiredMessageType;
    }
    getPacketText() {
        return this.packetText;
    }
    getPacketExtra() {
        return json_util_1.JsonUtil.stringifyLoseless(Object.assign(Object.assign({}, this.textExtra), this.attachment.toJsonAttachment()));
    }
}
exports.AttachmentTemplate = AttachmentTemplate;
//# sourceMappingURL=message-template.js.map