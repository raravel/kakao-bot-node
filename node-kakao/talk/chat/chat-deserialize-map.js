"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDeserializeMap = void 0;
const chat_type_1 = require("./chat-type");
const chat_1 = require("./chat");
class ChatDeserializeMap {
    static init() {
        this.typeMap.set(chat_type_1.ChatType.Feed, chat_1.FeedChat);
        this.typeMap.set(chat_type_1.ChatType.Text, chat_1.TextChat);
        this.typeMap.set(chat_type_1.ChatType.Photo, chat_1.SinglePhotoChat);
        this.typeMap.set(chat_type_1.ChatType.MultiPhoto, chat_1.MultiPhotoChat);
        this.typeMap.set(chat_type_1.ChatType.Video, chat_1.VideoChat);
        this.typeMap.set(chat_type_1.ChatType.Sticker, chat_1.StaticEmoticonChat);
        this.typeMap.set(chat_type_1.ChatType.StickerAni, chat_1.AnimatedEmoticonChat);
        this.typeMap.set(chat_type_1.ChatType.Search, chat_1.SharpSearchChat);
        this.typeMap.set(chat_type_1.ChatType.Map, chat_1.MapChat);
        this.typeMap.set(chat_type_1.ChatType.Reply, chat_1.ReplyChat);
        this.typeMap.set(chat_type_1.ChatType.Custom, chat_1.CustomChat);
    }
    static get DefaultConstructor() {
        return this.defaultConstructor;
    }
    static getChatConstructor(type) {
        return this.typeMap.get(type) || this.defaultConstructor;
    }
}
exports.ChatDeserializeMap = ChatDeserializeMap;
ChatDeserializeMap.typeMap = new Map();
ChatDeserializeMap.defaultConstructor = chat_1.UnknownChat;
ChatDeserializeMap.init();
//# sourceMappingURL=chat-deserialize-map.js.map