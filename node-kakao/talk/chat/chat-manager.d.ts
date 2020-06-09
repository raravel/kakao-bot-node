import { TalkClient } from "../../talk-client";
import { ChatlogStruct } from "../struct/chatlog-struct";
import { Long } from "bson";
export declare class ChatManager {
    private client;
    private messageId;
    constructor(client: TalkClient);
    get Client(): TalkClient;
    get CurrentMessageId(): number;
    getNextMessageId(): number;
    chatFromChatlog(chatLog: ChatlogStruct): Promise<import("./chat").Chat>;
    deleteChat(channelId: Long, logId: Long): Promise<boolean>;
}
