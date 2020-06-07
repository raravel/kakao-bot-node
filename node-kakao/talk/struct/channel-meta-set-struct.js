"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMetaSetStruct = void 0;
const __1 = require("../..");
const json_util_1 = require("../../util/json-util");
const chat_info_struct_1 = require("./chat-info-struct");
class ChannelMetaSetStruct {
    constructor(ChannelId = __1.Long.ZERO, MetaList = []) {
        this.ChannelId = ChannelId;
        this.MetaList = MetaList;
    }
    fromJson(rawData) {
        this.ChannelId = json_util_1.JsonUtil.readLong(rawData['c']);
        this.MetaList = [];
        if (rawData['ms']) {
            let list = rawData['ms'];
            for (let rawMeta of list) {
                let meta = new chat_info_struct_1.ChannelMetaStruct();
                meta.fromJson(rawMeta);
                this.MetaList.push(meta);
            }
        }
    }
    toJson() {
        let rawMetaList = [];
        for (let meta of this.MetaList) {
            rawMetaList.push(meta.toJson());
        }
        return {
            'c': this.ChannelId,
            'ms': rawMetaList
        };
    }
}
exports.ChannelMetaSetStruct = ChannelMetaSetStruct;
//# sourceMappingURL=channel-meta-set-struct.js.map