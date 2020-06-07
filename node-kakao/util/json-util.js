"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUtil = void 0;
const bson_1 = require("bson");
const LosslessJSON = require('lossless-json');
var JsonUtil;
(function (JsonUtil) {
    function readLong(value) {
        if (value && value.unsigned !== undefined) {
            return value;
        }
        return bson_1.Long.fromNumber(value);
    }
    JsonUtil.readLong = readLong;
    function parseLoseless(obj) {
        return LosslessJSON.parse(obj, bsonLongRiviver);
    }
    JsonUtil.parseLoseless = parseLoseless;
    function stringifyLoseless(obj) {
        return LosslessJSON.stringify(obj, bsonLongReplacer);
    }
    JsonUtil.stringifyLoseless = stringifyLoseless;
    function bsonLongRiviver(key, value) {
        if (value && value.isLosslessNumber) {
            try {
                return value.valueOf();
            }
            catch (e) {
                return bson_1.Long.fromString(value.toString());
            }
        }
        return value;
    }
    function bsonLongReplacer(key, value) {
        if (value && value instanceof bson_1.Long) {
            return new LosslessJSON.LosslessNumber(value.toString());
        }
        return value;
    }
})(JsonUtil = exports.JsonUtil || (exports.JsonUtil = {}));
//# sourceMappingURL=json-util.js.map