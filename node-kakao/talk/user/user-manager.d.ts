import { IdStore } from "../../store/store";
import { ChatUser } from "./chat-user";
import { Long } from "bson";
import { TalkClient } from "../../talk-client";
import { MemberStruct } from "../struct/member-struct";
export declare class UserManager extends IdStore<ChatUser> {
    private client;
    constructor(client: TalkClient);
    get Client(): TalkClient;
    protected fetchValue(key: Long): ChatUser;
    get(key: Long): ChatUser;
    requestMemberInfo(channelId: Long): Promise<MemberStruct[]>;
    requestSpecificMemberInfo(channelId: Long, idList: Long[]): Promise<MemberStruct[]>;
    initalizeClient(): void;
}
