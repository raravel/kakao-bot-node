"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyAttachment = exports.ChatMention = exports.MentionContentList = exports.MapAttachment = exports.LongTextAttachment = exports.EmoticonAniAttachment = exports.EmoticonAttachment = exports.AudioAttachment = exports.FileAttachment = exports.VideoAttachment = exports.PhotoAttachment = void 0;
const kakao_api_1 = require("../../../kakao-api");
const bson_1 = require("bson");
const chat_type_1 = require("../chat-type");
const json_util_1 = require("../../../util/json-util");
class PhotoAttachment {
    constructor(KeyPath = '', Width = 0, Height = 0, ImageURL = '', Size = bson_1.Long.ZERO, ThumbnailURL = '', ThumbnailWidth = -1, ThumbnailHeight = -1) {
        this.KeyPath = KeyPath;
        this.Width = Width;
        this.Height = Height;
        this.ImageURL = ImageURL;
        this.Size = Size;
        this.ThumbnailURL = ThumbnailURL;
        this.ThumbnailWidth = ThumbnailWidth;
        this.ThumbnailHeight = ThumbnailHeight;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Photo;
    }
    readAttachment(rawJson) {
        this.KeyPath = rawJson['k'];
        this.Width = rawJson['w'];
        this.Height = rawJson['h'];
        this.ImageURL = rawJson['url'];
        this.ThumbnailURL = rawJson['thumbnailUrl'];
        this.ThumbnailWidth = rawJson['thumbnailWidth'];
        this.ThumbnailHeight = rawJson['thumbnailHeight'];
        this.Size = json_util_1.JsonUtil.readLong(rawJson['s'] || rawJson['size']);
    }
    toJsonAttachment() {
        let obj = {
            'url': this.ImageURL,
            'k': this.KeyPath,
            'w': this.Width,
            'h': this.Height
        };
        if (this.ThumbnailURL !== '') {
            obj['thumbnailUrl'] = this.ThumbnailURL;
        }
        if (this.ThumbnailWidth !== -1) {
            obj['thumbnailWidth'] = this.ThumbnailWidth;
        }
        if (this.ThumbnailHeight !== -1) {
            obj['thumbnailHeight'] = this.ThumbnailHeight;
        }
        if (this.Size !== bson_1.Long.ZERO) {
            obj['s'] = obj['size'] = this.Size;
        }
        return obj;
    }
    static async fromBuffer(data, name, width, height, size = data.byteLength) {
        let path = await kakao_api_1.KakaoAPI.uploadAttachment(kakao_api_1.KakaoAPI.AttachmentType.IMAGE, data, name);
        return new PhotoAttachment(kakao_api_1.KakaoAPI.getUploadedFileKey(path), width, height, kakao_api_1.KakaoAPI.getUploadedFile(path, kakao_api_1.KakaoAPI.AttachmentType.IMAGE), bson_1.Long.fromNumber(size));
    }
}
exports.PhotoAttachment = PhotoAttachment;
class VideoAttachment {
    constructor(KeyPath = '', Width = 0, Height = 0, Duration = 0, VideoURL = '', Size = bson_1.Long.ZERO) {
        this.KeyPath = KeyPath;
        this.Width = Width;
        this.Height = Height;
        this.Duration = Duration;
        this.VideoURL = VideoURL;
        this.Size = Size;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Video;
    }
    readAttachment(rawJson) {
        this.KeyPath = rawJson['tk'];
        this.Width = rawJson['w'];
        this.Height = rawJson['h'];
        this.Duration = rawJson['d'];
        this.VideoURL = rawJson['url'];
        this.Size = json_util_1.JsonUtil.readLong(rawJson['s'] || rawJson['size']);
    }
    toJsonAttachment() {
        let obj = {
            'url': this.VideoURL,
            'tk': this.KeyPath,
            'w': this.Width,
            'h': this.Height,
            'd': this.Duration
        };
        if (this.Size !== bson_1.Long.ZERO) {
            obj['s'] = obj['size'] = this.Size;
        }
        return obj;
    }
    static async fromBuffer(data, name, width, height, duration, size = data.byteLength) {
        let path = await kakao_api_1.KakaoAPI.uploadAttachment(kakao_api_1.KakaoAPI.AttachmentType.VIDEO, data, name);
        return new VideoAttachment(kakao_api_1.KakaoAPI.getUploadedFileKey(path), width, height, duration, kakao_api_1.KakaoAPI.getUploadedFile(path, kakao_api_1.KakaoAPI.AttachmentType.VIDEO), bson_1.Long.fromNumber(size));
    }
}
exports.VideoAttachment = VideoAttachment;
class FileAttachment {
    constructor(KeyPath = '', FileURL = '', Name = '', Size = bson_1.Long.ZERO, Expire = bson_1.Long.ZERO) {
        this.KeyPath = KeyPath;
        this.FileURL = FileURL;
        this.Name = Name;
        this.Size = Size;
        this.Expire = Expire;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.File;
    }
    readAttachment(rawJson) {
        this.KeyPath = rawJson['k'];
        this.FileURL = rawJson['url'];
        this.Name = rawJson['name'];
        this.Size = json_util_1.JsonUtil.readLong(rawJson['size'] || rawJson['s']);
        this.Expire = json_util_1.JsonUtil.readLong(rawJson['expire']);
    }
    toJsonAttachment() {
        let obj = {
            'url': this.FileURL,
            'name': this.Name,
            'k': this.KeyPath,
        };
        if (this.Size !== bson_1.Long.ZERO) {
            obj['s'] = obj['size'] = this.Size;
        }
        if (this.Expire !== bson_1.Long.ZERO) {
            obj['expire'] = this.Expire;
        }
        return obj;
    }
    static async fromBuffer(data, name, width, height, size = data.byteLength) {
        let path = await kakao_api_1.KakaoAPI.uploadAttachment(kakao_api_1.KakaoAPI.AttachmentType.FILE, data, name);
        return new FileAttachment(kakao_api_1.KakaoAPI.getUploadedFileKey(path), kakao_api_1.KakaoAPI.getUploadedFile(path, kakao_api_1.KakaoAPI.AttachmentType.FILE), name, bson_1.Long.fromNumber(size), bson_1.Long.fromNumber(Date.now() + 1209600000));
    }
}
exports.FileAttachment = FileAttachment;
class AudioAttachment {
    constructor(KeyPath = '', AudioURL = '', Size = bson_1.Long.ZERO) {
        this.KeyPath = KeyPath;
        this.AudioURL = AudioURL;
        this.Size = Size;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Audio;
    }
    readAttachment(rawJson) {
        this.KeyPath = rawJson['tk'];
        this.AudioURL = rawJson['url'];
        this.Size = json_util_1.JsonUtil.readLong(rawJson['s'] || rawJson['size']);
    }
    toJsonAttachment() {
        let obj = {
            'url': this.AudioURL,
            'tk': this.KeyPath,
        };
        if (this.Size !== bson_1.Long.ZERO) {
            obj['s'] = obj['size'] = this.Size;
        }
        return obj;
    }
    static async fromBuffer(data, name, size = data.byteLength) {
        let path = await kakao_api_1.KakaoAPI.uploadAttachment(kakao_api_1.KakaoAPI.AttachmentType.AUDIO, data, name);
        return new AudioAttachment(kakao_api_1.KakaoAPI.getUploadedFileKey(path), kakao_api_1.KakaoAPI.getUploadedFile(path, kakao_api_1.KakaoAPI.AttachmentType.AUDIO), bson_1.Long.fromNumber(size));
    }
}
exports.AudioAttachment = AudioAttachment;
class EmoticonAttachment {
    constructor(Name = '', Path = '', Type = '', StopAt = 0, Sound = '', Width = -1, Height = -1, Description = '') {
        this.Name = Name;
        this.Path = Path;
        this.Type = Type;
        this.StopAt = StopAt;
        this.Sound = Sound;
        this.Width = Width;
        this.Height = Height;
        this.Description = Description;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Sticker;
    }
    getEmoticonURL(region = 'kr') {
        return kakao_api_1.KakaoAPI.getEmoticonImageURL(this.Path, region);
    }
    readAttachment(rawJson) {
        this.Path = rawJson['path'];
        this.Name = rawJson['name'];
        this.Type = rawJson['type'];
        this.Description = rawJson['alt'];
        this.StopAt = rawJson['s'];
        this.Sound = rawJson['sound'];
        this.Width = rawJson['width'] || -1;
        this.Height = rawJson['height'] || -1;
    }
    toJsonAttachment() {
        let obj = {
            'path': this.Path,
            'name': this.Name,
            'type': this.Type,
            's': this.StopAt
        };
        if (this.Description !== '') {
            obj['alt'] = this.Description;
        }
        if (this.Sound !== '') {
            obj['sound'] = this.Sound;
        }
        if (this.Width !== -1) {
            obj['width'] = this.Width;
        }
        if (this.Height !== -1) {
            obj['height'] = this.Height;
        }
        return obj;
    }
}
exports.EmoticonAttachment = EmoticonAttachment;
class EmoticonAniAttachment extends EmoticonAttachment {
    get RequiredMessageType() {
        return chat_type_1.ChatType.StickerAni;
    }
}
exports.EmoticonAniAttachment = EmoticonAniAttachment;
class LongTextAttachment {
    constructor(Path = '', KeyPath = '', Size = bson_1.Long.ZERO, TextOmitted = false) {
        this.Path = Path;
        this.KeyPath = KeyPath;
        this.Size = Size;
        this.TextOmitted = TextOmitted;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Text;
    }
    readAttachment(rawJson) {
        this.Path = rawJson['path'];
        this.KeyPath = rawJson['k'];
        this.Size = json_util_1.JsonUtil.readLong(rawJson['s'] || rawJson['size']);
        this.TextOmitted = rawJson['sd'];
    }
    toJsonAttachment() {
        let obj = {
            'path': this.Path,
            'k': this.KeyPath
        };
        if (this.Size !== bson_1.Long.ZERO) {
            obj['s'] = obj['size'] = this.Size;
        }
        if (this.TextOmitted) {
            obj['sd'] = this.TextOmitted;
        }
        return obj;
    }
    static async fromText(longText, name, size) {
        let buffer = Buffer.from(longText);
        return LongTextAttachment.fromBuffer(buffer, name, size ? size : buffer.byteLength);
    }
    static async fromBuffer(data, name, size = data.byteLength) {
        let path = await kakao_api_1.KakaoAPI.uploadAttachment(kakao_api_1.KakaoAPI.AttachmentType.FILE, data, name);
        return new LongTextAttachment(path, kakao_api_1.KakaoAPI.getUploadedFileKey(path), bson_1.Long.fromNumber(size), true);
    }
}
exports.LongTextAttachment = LongTextAttachment;
class MapAttachment {
    constructor(Lat = 0, Lng = 0, Name = '', C = false) {
        this.Lat = Lat;
        this.Lng = Lng;
        this.Name = Name;
        this.C = C;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Map;
    }
    readAttachment(rawData) {
        this.Lat = rawData['lat'];
        this.Lng = rawData['lng'];
        this.Name = rawData['a'];
        this.C = rawData['c'];
    }
    toJsonAttachment() {
        return {
            'lat': this.Lat,
            'lng': this.Lng,
            'a': this.Name,
            'c': this.C
        };
    }
}
exports.MapAttachment = MapAttachment;
class MentionContentList {
    constructor(UserId = bson_1.Long.ZERO, Length = 0, IndexList = []) {
        this.UserId = UserId;
        this.Length = Length;
        this.IndexList = IndexList;
    }
    readRawContent(rawData) {
        this.IndexList = rawData['at'] || [];
        this.UserId = json_util_1.JsonUtil.readLong(rawData['user_id']);
        this.Length = rawData['len'];
    }
    toRawContent() {
        let obj = {
            'at': this.IndexList,
            'len': this.Length,
            'user_id': this.UserId
        };
        return obj;
    }
}
exports.MentionContentList = MentionContentList;
class ChatMention {
    constructor(User) {
        this.User = User;
    }
    get ContentType() {
        return 'mention';
    }
}
exports.ChatMention = ChatMention;
class ReplyAttachment {
    constructor(SourceType = chat_type_1.ChatType.Text, SourceLogId = bson_1.Long.ZERO, SourceUserId = bson_1.Long.ZERO, SourceMessage = '', SourceMentionList = [], SourceLinkId = bson_1.Long.ZERO) {
        this.SourceType = SourceType;
        this.SourceLogId = SourceLogId;
        this.SourceUserId = SourceUserId;
        this.SourceMessage = SourceMessage;
        this.SourceMentionList = SourceMentionList;
        this.SourceLinkId = SourceLinkId;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Reply;
    }
    readAttachment(rawData) {
        this.SourceLogId = json_util_1.JsonUtil.readLong(rawData['src_logId']);
        let rawMentionList = rawData['src_mentions'] || [];
        this.SourceMentionList = [];
        for (let rawMention of rawMentionList) {
            let content = new MentionContentList();
            content.readRawContent(rawMention);
            this.SourceMentionList.push(content);
        }
        this.SourceMessage = rawData['src_message'];
        this.SourceType = rawData['src_type'];
        this.SourceUserId = json_util_1.JsonUtil.readLong(rawData['src_userId']);
        if (rawData['src_linkId']) {
            this.SourceLinkId = json_util_1.JsonUtil.readLong(rawData['src_linkId']);
        }
    }
    toJsonAttachment() {
        let obj = {
            'src_logId': this.SourceLogId,
            'src_mentions': this.SourceMentionList,
            'src_message': this.SourceMessage,
            'src_type': this.SourceType,
            'src_userId': this.SourceUserId
        };
        if (this.SourceLinkId !== bson_1.Long.ZERO) {
            obj['src_linkId'] = this.SourceLinkId;
        }
        return obj;
    }
    static fromChat(chat) {
        return new ReplyAttachment(chat.Type, chat.LogId, chat.Sender.Id, chat.Text, chat.getMentionContentList());
    }
}
exports.ReplyAttachment = ReplyAttachment;
//# sourceMappingURL=chat-attachment.js.map