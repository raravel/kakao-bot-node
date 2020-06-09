import { FeedType } from "../feed/feed-type";
import { MemberStruct } from "../struct/member-struct";
import { Long } from "bson";
export declare class ChatFeed {
    private feedType;
    private text?;
    private member?;
    private inviter?;
    private memberList?;
    private logId?;
    private hidden?;
    constructor(feedType: FeedType, text?: string | undefined, member?: MemberStruct | undefined, inviter?: MemberStruct | undefined, memberList?: MemberStruct[] | undefined, logId?: Long | undefined, hidden?: boolean | undefined);
    get FeedType(): FeedType;
    get LogId(): Long | undefined;
    get Hidden(): boolean | undefined;
    get Member(): MemberStruct | undefined;
    get MemberList(): MemberStruct[] | undefined;
    get Inviter(): MemberStruct | undefined;
    get Text(): string | undefined;
    static getFeedFromText(rawFeed: string): ChatFeed;
    static feedToJson(feed: ChatFeed): any;
}
