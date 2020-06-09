import { ChatType } from "./chat-type";
import { Chat } from "./chat";
import { Long } from "bson";
import { ChatChannel } from "../channel/chat-channel";
import { ChatUser } from "../user/chat-user";
export declare namespace ChatDeserializeMap {
    type ChatConstructor = new (channel: ChatChannel, sender: ChatUser, messageId: number, logId: Long, prevLogId: Long, sendTime: number, text: string, rawAttachment: string | undefined) => Chat;
}
export declare class ChatDeserializeMap {
    private static typeMap;
    private static defaultConstructor;
    static init(): void;
    static get DefaultConstructor(): ChatDeserializeMap.ChatConstructor;
    static getChatConstructor(type: ChatType): ChatDeserializeMap.ChatConstructor;
}
