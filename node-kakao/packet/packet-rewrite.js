"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketRewriteRes = exports.PacketRewriteReq = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const bson_1 = require("bson");
const feed_type_1 = require("../talk/feed/feed-type");
class PacketRewriteReq extends loco_bson_packet_1.LocoBsonRequestPacket {
    constructor(LinkId = bson_1.Long.ZERO, ChannelId = bson_1.Long.ZERO, LogId = bson_1.Long.ZERO, Time = 0, RewriteFeedType = feed_type_1.FeedType.OPENLINK_REWRITE_FEED, Unknown1 = '', Unknown2 = '') {
        super();
        this.LinkId = LinkId;
        this.ChannelId = ChannelId;
        this.LogId = LogId;
        this.Time = Time;
        this.RewriteFeedType = RewriteFeedType;
        this.Unknown1 = Unknown1;
        this.Unknown2 = Unknown2;
    }
    get PacketName() {
        return 'REWRITE';
    }
    toBodyJson() {
        let obj = {
            'li': this.LinkId,
            'c': this.ChannelId,
            'logId': this.LogId,
            't': this.Time
        };
        if (this.Unknown1 !== '') {
            obj['rcli'] = this.Unknown1;
        }
        if (this.Unknown2 !== '') {
            obj['cat'] = this.Unknown2;
        }
        if (this.RewriteFeedType === feed_type_1.FeedType.RICH_CONTENT) {
            obj['ft'] = this.RewriteFeedType;
        }
        return obj;
    }
}
exports.PacketRewriteReq = PacketRewriteReq;
class PacketRewriteRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    get PacketName() {
        return 'REWRITE';
    }
    readBodyJson(body) {
    }
}
exports.PacketRewriteRes = PacketRewriteRes;
//# sourceMappingURL=packet-rewrite.js.map