"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomChat = exports.ReplyChat = exports.MapChat = exports.SharpSearchChat = exports.LongTextChat = exports.VideoChat = exports.AnimatedEmoticonChat = exports.StaticEmoticonChat = exports.EmoticonChat = exports.MultiPhotoChat = exports.SinglePhotoChat = exports.PhotoChat = exports.TextChat = exports.FeedChat = exports.UnknownChat = exports.Chat = void 0;
const chat_type_1 = require("./chat-type");
const __1 = require("../..");
const chat_attachment_1 = require("./attachment/chat-attachment");
const sharp_attachment_1 = require("./attachment/sharp-attachment");
const json_util_1 = require("../../util/json-util");
const chat_feed_1 = require("./chat-feed");
const custom_attachment_1 = require("./attachment/custom-attachment");
const channel_type_1 = require("./channel-type");
class Chat {
    constructor(channel, sender, messageId, logId, prevLogId, sendTime, text, rawAttachment = '{}') {
        this.channel = channel;
        this.sender = sender;
        this.logId = logId;
        this.prevLogId = prevLogId;
        this.text = text;
        this.messageId = messageId;
        this.sendTime = sendTime;
        this.attachmentList = [];
        this.mentionMap = new Map();
        this.processAttachment(text, rawAttachment);
    }
    get Channel() {
        return this.channel;
    }
    get Sender() {
        return this.sender;
    }
    get PrevLogId() {
        return this.prevLogId;
    }
    get LogId() {
        return this.logId;
    }
    get MessageId() {
        return this.messageId;
    }
    get Text() {
        return this.text;
    }
    get SendTime() {
        return this.sendTime;
    }
    get AttachmentList() {
        return this.attachmentList;
    }
    get MentionMap() {
        return this.mentionMap;
    }
    getMentionContentList() {
        return Array.from(this.mentionMap.values());
    }
    isMentioned(userId) {
        return this.mentionMap.has(userId.toString());
    }
    getUserMentionList(userId) {
        if (!this.isMentioned(userId))
            return null;
        return this.mentionMap.get(userId.toString());
    }
    getMentionCount(userId) {
        let mentionList = this.getUserMentionList(userId);
        if (!mentionList)
            return 0;
        return this.getUserMentionList(userId).IndexList.length;
    }
    isFeed() {
        return this.Type === chat_type_1.ChatType.Feed;
    }
    getFeed() {
        if (!this.isFeed()) {
            throw new Error(`Message ${this.logId.toString()} is not Feed`);
        }
        if (this.feed)
            return this.feed;
        return this.feed = chat_feed_1.ChatFeed.getFeedFromText(this.text);
    }
    processAttachment(text, rawAttachment) {
        if (!rawAttachment || rawAttachment === '') {
            return;
        }
        let json = {};
        try {
            json = json_util_1.JsonUtil.parseLoseless(rawAttachment);
        }
        catch (e) {
        }
        this.readAttachment(json, this.attachmentList);
        if (json['mentions'])
            this.processMention(json['mentions']);
    }
    processMention(rawMentions) {
        this.mentionMap.clear();
        for (let rawMention of rawMentions) {
            let content = new chat_attachment_1.MentionContentList();
            content.readRawContent(rawMention);
            this.mentionMap.set(content.UserId.toString(), content);
        }
    }
    async replyText(...textFormat) {
        return this.Channel.sendText(...textFormat);
    }
    async replyTemplate(template) {
        return this.Channel.sendTemplate(template);
    }
    get Deletable() {
        return this.Sender.isClientUser();
    }
    get Hidable() {
        return this.channel.isOpenChat() && this.channel.Type === channel_type_1.ChannelType.OPENCHAT_GROUP;
    }
    async delete() {
        if (!this.Deletable) {
            return false;
        }
        return this.channel.Client.ChatManager.deleteChat(this.Channel.Id, this.logId);
    }
    async hide() {
        if (!this.Hidable) {
            return false;
        }
        let openChannel = this.channel;
        return openChannel.hideChat(this);
    }
}
exports.Chat = Chat;
class UnknownChat extends Chat {
    constructor() {
        super(...arguments);
        this.rawAttachment = {};
    }
    get Type() {
        return chat_type_1.ChatType.Unknown;
    }
    get RawAttachment() {
        return this.rawAttachment;
    }
    readAttachment(attachmentJson, attachmentList) {
        this.rawAttachment = attachmentJson;
    }
}
exports.UnknownChat = UnknownChat;
class FeedChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Feed;
    }
    readAttachment(attachmentJson, attachmentList) {
    }
}
exports.FeedChat = FeedChat;
class TextChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Text;
    }
    readAttachment(attachmentJson, attachmentList) {
        if (attachmentJson['path'] && attachmentJson['k'] && attachmentJson['s'] && attachmentJson['cs']) {
            attachmentList.push(new chat_attachment_1.LongTextAttachment(attachmentJson['path'], attachmentJson['k'], attachmentJson['s']));
        }
    }
}
exports.TextChat = TextChat;
class PhotoChat extends Chat {
    get AttachmentList() {
        return super.AttachmentList;
    }
}
exports.PhotoChat = PhotoChat;
class SinglePhotoChat extends PhotoChat {
    get Type() {
        return chat_type_1.ChatType.Photo;
    }
    readAttachment(attachmentJson, attachmentList) {
        let photoAttachment = new __1.PhotoAttachment();
        photoAttachment.readAttachment(attachmentJson);
        attachmentList.push(photoAttachment);
    }
}
exports.SinglePhotoChat = SinglePhotoChat;
class MultiPhotoChat extends PhotoChat {
    get Type() {
        return chat_type_1.ChatType.MultiPhoto;
    }
    readAttachment(attachmentJson, attachmentList) {
        let keyPathList = attachmentJson['kl'];
        for (let i = 0; i < keyPathList.length; i++) {
            let photoAttachment = new __1.PhotoAttachment(attachmentJson['kl'][i], attachmentJson['wl'][i], attachmentJson['hl'][i], attachmentJson['imageUrls'][i], attachmentJson['thumbnailUrls'][i], attachmentJson['thumbnailWidths'][i], attachmentJson['thumbnailHeights'][i], attachmentJson['sl'][i]);
            attachmentList.push(photoAttachment);
        }
    }
}
exports.MultiPhotoChat = MultiPhotoChat;
class EmoticonChat extends Chat {
}
exports.EmoticonChat = EmoticonChat;
class StaticEmoticonChat extends EmoticonChat {
    get Type() {
        return chat_type_1.ChatType.Sticker;
    }
    readAttachment(attachmentJson, attachmentList) {
        let attachment = new chat_attachment_1.EmoticonAttachment();
        attachment.readAttachment(attachmentJson);
        attachmentList.push(attachment);
    }
}
exports.StaticEmoticonChat = StaticEmoticonChat;
class AnimatedEmoticonChat extends EmoticonChat {
    get Type() {
        return chat_type_1.ChatType.StickerAni;
    }
    readAttachment(attachmentJson, attachmentList) {
        let attachment = new chat_attachment_1.EmoticonAttachment();
        attachment.readAttachment(attachmentJson);
        attachmentList.push(attachment);
    }
}
exports.AnimatedEmoticonChat = AnimatedEmoticonChat;
class VideoChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Video;
    }
    readAttachment(attachmentJson, attachmentList) {
        let attachment = new chat_attachment_1.VideoAttachment();
        attachment.readAttachment(attachmentJson);
        attachmentList.push(attachment);
    }
}
exports.VideoChat = VideoChat;
class LongTextChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Text;
    }
    readAttachment(attachmentJson, attachmentList) {
        let textAttachment = new chat_attachment_1.LongTextAttachment();
        textAttachment.readAttachment(attachmentJson);
        attachmentList.push(textAttachment);
    }
}
exports.LongTextChat = LongTextChat;
class SharpSearchChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Search;
    }
    readAttachment(attachmentJson, attachmentList) {
        let sharpAttachment = new sharp_attachment_1.SharpAttachment();
        sharpAttachment.readAttachment(attachmentJson);
        attachmentList.push(sharpAttachment);
    }
}
exports.SharpSearchChat = SharpSearchChat;
class MapChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Map;
    }
    readAttachment(attachmentJson, attachmentList) {
        let mapAttachment = new chat_attachment_1.MapAttachment();
        mapAttachment.readAttachment(attachmentJson);
        attachmentList.push(mapAttachment);
    }
}
exports.MapChat = MapChat;
class ReplyChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Reply;
    }
    readAttachment(attachmentJson, attachmentList) {
        let sharpAttachment = new sharp_attachment_1.SharpAttachment();
        sharpAttachment.readAttachment(attachmentJson);
        attachmentList.push(sharpAttachment);
    }
}
exports.ReplyChat = ReplyChat;
class CustomChat extends Chat {
    get Type() {
        return chat_type_1.ChatType.Custom;
    }
    readAttachment(attachmentJson, attachmentList) {
        let customAttachment = new custom_attachment_1.CustomAttachment();
        customAttachment.readAttachment(attachmentJson);
        attachmentList.push(customAttachment);
    }
}
exports.CustomChat = CustomChat;
//# sourceMappingURL=chat.js.map