"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedType = void 0;
var FeedType;
(function (FeedType) {
    FeedType[FeedType["UNDEFINED"] = -999999] = "UNDEFINED";
    FeedType[FeedType["LOCAL_LEAVE"] = -1] = "LOCAL_LEAVE";
    FeedType[FeedType["INVITE"] = 1] = "INVITE";
    FeedType[FeedType["LEAVE"] = 2] = "LEAVE";
    FeedType[FeedType["SECRET_LEAVE"] = 3] = "SECRET_LEAVE";
    FeedType[FeedType["OPENLINK_JOIN"] = 4] = "OPENLINK_JOIN";
    FeedType[FeedType["OPENLINK_DELETE_LINK"] = 5] = "OPENLINK_DELETE_LINK";
    FeedType[FeedType["OPENLINK_KICKED"] = 6] = "OPENLINK_KICKED";
    FeedType[FeedType["CHAT_KICKED"] = 7] = "CHAT_KICKED";
    FeedType[FeedType["CHAT_DELETED"] = 8] = "CHAT_DELETED";
    FeedType[FeedType["RICH_CONTENT"] = 10] = "RICH_CONTENT";
    FeedType[FeedType["OPENLINK_STAFF_ON"] = 11] = "OPENLINK_STAFF_ON";
    FeedType[FeedType["OPENLINK_STAFF_OFF"] = 12] = "OPENLINK_STAFF_OFF";
    FeedType[FeedType["OPENLINK_REWRITE_FEED"] = 13] = "OPENLINK_REWRITE_FEED";
    FeedType[FeedType["DELETE_TO_ALL"] = 14] = "DELETE_TO_ALL";
    FeedType[FeedType["OPENLINK_HAND_OVER_HOST"] = 15] = "OPENLINK_HAND_OVER_HOST";
})(FeedType = exports.FeedType || (exports.FeedType = {}));
//# sourceMappingURL=feed-type.js.map