"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatFeed = void 0;
const json_util_1 = require("../../util/json-util");
const member_struct_1 = require("../struct/member-struct");
class ChatFeed {
    constructor(feedType, text, member, inviter, memberList, logId, hidden) {
        this.feedType = feedType;
        this.text = text;
        this.member = member;
        this.inviter = inviter;
        this.memberList = memberList;
        this.logId = logId;
        this.hidden = hidden;
    }
    get FeedType() {
        return this.feedType;
    }
    get LogId() {
        return this.logId;
    }
    get Hidden() {
        return this.hidden;
    }
    get Member() {
        return this.member;
    }
    get MemberList() {
        return this.memberList;
    }
    get Inviter() {
        return this.inviter;
    }
    get Text() {
        return this.text;
    }
    static getFeedFromText(rawFeed) {
        let obj = json_util_1.JsonUtil.parseLoseless(rawFeed);
        let type = obj['feedType'];
        let memberStruct;
        if (obj['member']) {
            memberStruct = new member_struct_1.MemberStruct();
            memberStruct.fromJson(obj['member']);
        }
        let inviterStruct;
        if (obj['inviter']) {
            inviterStruct = new member_struct_1.MemberStruct();
            inviterStruct.fromJson(obj['inviter']);
        }
        let memberListStruct;
        if (obj['members']) {
            memberListStruct = [];
            for (let rawMember of obj['members']) {
                let memberStruct = new member_struct_1.MemberStruct();
                memberStruct.fromJson(rawMember);
                memberListStruct.push(memberStruct);
            }
        }
        let logId;
        if (obj['logId'])
            logId = obj['logId'];
        let hidden;
        if (obj['hidden'])
            hidden = obj['hidden'];
        return new ChatFeed(type, obj['text'], memberStruct, inviterStruct, memberListStruct, logId, hidden);
    }
    static feedToJson(feed) {
        let obj = {};
        if (feed.member) {
            obj['member'] = feed.member;
        }
        obj['feedType'] = feed.feedType;
        if (feed.text) {
            obj['text'] = feed.text;
        }
        if (feed.memberList) {
            obj['members'] = feed.text;
        }
        if (feed.inviter) {
            obj['inviter'] = feed.inviter;
        }
        if (feed.inviter) {
            obj['inviter'] = feed.inviter;
        }
        if (feed.logId) {
            obj['logId'] = feed.logId;
        }
        if (feed.hidden) {
            obj['hidden'] = feed.hidden;
        }
        return obj;
    }
}
exports.ChatFeed = ChatFeed;
//# sourceMappingURL=chat-feed.js.map