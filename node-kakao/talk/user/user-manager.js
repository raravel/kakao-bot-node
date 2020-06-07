"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const store_1 = require("../../store/store");
const chat_user_1 = require("./chat-user");
const packet_get_member_1 = require("../../packet/packet-get-member");
const packet_member_1 = require("../../packet/packet-member");
class UserManager extends store_1.IdStore {
    constructor(client) {
        super();
        this.client = client;
    }
    get Client() {
        return this.client;
    }
    fetchValue(key) {
        return new chat_user_1.ChatUser(this.client, key);
    }
    get(key) {
        if (this.client.ClientUser.Id.equals(key))
            return this.client.ClientUser;
        return super.get(key, true);
    }
    async requestMemberInfo(channelId) {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_get_member_1.PacketGetMemberReq(channelId));
        return res.MemberList;
    }
    async requestSpecificMemberInfo(channelId, idList) {
        let res = await this.client.NetworkManager.requestPacketRes(new packet_member_1.PacketMemberReq(channelId, idList));
        return res.MemberList;
    }
    initalizeClient() {
        this.clear();
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=user-manager.js.map