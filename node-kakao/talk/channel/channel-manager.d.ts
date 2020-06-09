import { AsyncIdStore } from "../../store/store";
import { ChatChannel } from "./chat-channel";
import { Long } from "bson";
import { TalkClient } from "../../talk-client";
import { ChatUser } from "../user/chat-user";
import { ChatInfoStruct } from "../struct/chat-info-struct";
import { ChatDataStruct, ChatDataBase } from "../struct/chatdata-struct";
import { PacketChatOnRoomRes } from "../../packet/packet-chat-on-room";
export declare class ChannelManager extends AsyncIdStore<ChatChannel> {
    private client;
    constructor(client: TalkClient);
    get Client(): TalkClient;
    getChannelList(): ChatChannel[];
    get(id: Long): Promise<ChatChannel>;
    createChannel(users: ChatUser[], nickname?: string, profileURL?: string): Promise<ChatChannel>;
    protected fetchValue(id: Long): Promise<ChatChannel>;
    protected channelFromChatData(id: Long, chatData: ChatDataBase): ChatChannel;
    requestChannelInfo(channelId: Long): Promise<ChatInfoStruct>;
    requestChatOnRoom(channel: ChatChannel): Promise<PacketChatOnRoomRes>;
    leave(channel: ChatChannel, block?: boolean): Promise<boolean>;
    removeChannel(channel: ChatChannel): boolean;
    initalizeLoginData(chatDataList: ChatDataStruct[]): void;
}
