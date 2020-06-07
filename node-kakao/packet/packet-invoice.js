"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketInvoiceRes = void 0;
const loco_bson_packet_1 = require("./loco-bson-packet");
const chat_type_1 = require("../talk/chat/chat-type");
const json_util_1 = require("../util/json-util");
const bson_1 = require("bson");
class PacketInvoiceRes extends loco_bson_packet_1.LocoBsonResponsePacket {
    constructor(status, ChannelId = bson_1.Long.ZERO, Type = chat_type_1.ChatType.Text, Extra = '') {
        super(status);
        this.ChannelId = ChannelId;
        this.Type = Type;
        this.Extra = Extra;
    }
    get PacketName() {
        return 'INVOICE';
    }
    readBodyJson(body) {
        this.ChannelId = json_util_1.JsonUtil.readLong(body['c']);
        this.Type = body['t'];
        this.Extra = body['ex'] || '{}';
    }
}
exports.PacketInvoiceRes = PacketInvoiceRes;
//# sourceMappingURL=packet-invoice.js.map