"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelBoardType = exports.ChannelBoardMetaStruct = void 0;
class ChannelBoardMetaStruct {
    fromJson(rawData) {
        throw new Error("Method not implemented.");
    }
    toJson() {
        throw new Error("Method not implemented.");
    }
}
exports.ChannelBoardMetaStruct = ChannelBoardMetaStruct;
var ChannelBoardType;
(function (ChannelBoardType) {
    ChannelBoardType[ChannelBoardType["NONE"] = 0] = "NONE";
    ChannelBoardType[ChannelBoardType["FLOATING_NOTICE"] = 1] = "FLOATING_NOTICE";
    ChannelBoardType[ChannelBoardType["SIDE_NOTICE"] = 2] = "SIDE_NOTICE";
    ChannelBoardType[ChannelBoardType["BADGE"] = 3] = "BADGE";
})(ChannelBoardType = exports.ChannelBoardType || (exports.ChannelBoardType = {}));
//# sourceMappingURL=channel-board-meta-struct.js.map