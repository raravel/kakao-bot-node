"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenChatManager = void 0;
const packet_join_info_1 = require("../../packet/packet-join-info");
const bson_1 = require("bson");
const packet_info_link_1 = require("../../packet/packet-info-link");
const packet_sync_link_1 = require("../../packet/packet-sync-link");
const store_1 = require("../../store/store");
const loco_packet_base_1 = require("../../packet/loco-packet-base");
const packet_kick_member_1 = require("../../packet/packet-kick-member");
const packet_delete_link_1 = require("../../packet/packet-delete-link");
const packet_rewrite_1 = require("../../packet/packet-rewrite");
const feed_type_1 = require("../feed/feed-type");
const packet_set_mem_type_1 = require("../../packet/packet-set-mem-type");
const packet_join_link_1 = require("../../packet/packet-join-link");
const packet_update_openchat_profile_1 = require("../../packet/packet-update-openchat-profile");
const open_link_type_1 = require("./open-link-type");
class OpenChatManager extends store_1.AsyncIdStore {
    constructor(client) {
        super();
        this.client = client;
        this.clientLinkIdList = [];
    }
    get Client() {
        return this.client;
    }
    get NetworkManager() {
        return this.client.NetworkManager;
    }
    get ClientUser() {
        return this.client.ClientUser;
    }
    get ClientLinkList() {
        return this.clientLinkIdList.map(strId => bson_1.Long.fromString(strId));
    }
    isClientLink(id) {
        return this.clientLinkIdList.includes(id.toString());
    }
    async fetchInfoFromIdList(linkId) {
        let res = await this.NetworkManager.requestPacketRes(new packet_info_link_1.PacketInfoLinkReq(linkId));
        return res.LinkList;
    }
    async fetchInfoFromURL(openLinkURL) {
        if (!openLinkURL.match(OpenChatManager.LINK_REGEX))
            return null;
        let res = await this.NetworkManager.requestPacketRes(new packet_join_info_1.PacketJoinInfoReq(openLinkURL, 'EW'));
        if (res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS) {
            this.setCache(res.OpenLink.LinkId, res.OpenLink);
            return res.OpenLink;
        }
        return null;
    }
    async fetchValue(key) {
        return (await this.fetchInfoFromIdList([key]))[0];
    }
    async requestClientProfile() {
        let openChatToken = this.ClientUser.MainOpenToken;
        let res = await this.Client.NetworkManager.requestPacketRes(new packet_sync_link_1.PacketSyncLinkReq(openChatToken));
        return res.LinkList;
    }
    async initOpenSession() {
        this.clear();
        this.clientLinkIdList = [];
        let list = await this.requestClientProfile();
        for (let profile of list) {
            this.setCache(profile.LinkId, profile);
            this.clientLinkIdList.push(profile.LinkId.toString());
        }
    }
    async getLinkOwner(linkId) {
        let info = await this.get(linkId);
        return this.client.UserManager.get(info.Owner.UserId);
    }
    async kickMember(channel, userId) {
        let info = await channel.getChannelInfo();
        if (info.hasUserInfo(userId)) {
            let res = await this.Client.NetworkManager.requestPacketRes(new packet_kick_member_1.PacketKickMemberReq(channel.LinkId, channel.Id, userId));
            return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
        }
        return false;
    }
    async deleteLink(linkId) {
        if ((await this.getLinkOwner(linkId)) !== this.ClientUser)
            return false;
        let res = await this.Client.NetworkManager.requestPacketRes(new packet_delete_link_1.PacketDeleteLinkReq(linkId));
        this.delete(linkId);
        let strLinkId = linkId.toString();
        this.clientLinkIdList = this.clientLinkIdList.filter(strKey => strKey !== strLinkId);
        return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
    }
    async hideChat(channel, logId) {
        let res = await this.Client.NetworkManager.requestPacketRes(new packet_rewrite_1.PacketRewriteReq(channel.LinkId, channel.Id, logId, Math.floor(Date.now() / 1000), feed_type_1.FeedType.OPENLINK_REWRITE_FEED));
        return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
    }
    async updateOpenMemberTypeList(channel, idTypeSet) {
        let linkId = channel.LinkId;
        if ((await this.getLinkOwner(linkId)) !== this.ClientUser)
            return false;
        let res = await this.Client.NetworkManager.requestPacketRes(new packet_set_mem_type_1.PacketSetMemTypeReq(linkId, channel.Id, Array.from(idTypeSet.keys()), Array.from(idTypeSet.values())));
        return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
    }
    async setOpenMemberType(channel, userId, type) {
        let linkId = channel.LinkId;
        if ((await this.getLinkOwner(linkId)) !== this.ClientUser)
            return false;
        let res = await this.Client.NetworkManager.requestPacketRes(new packet_set_mem_type_1.PacketSetMemTypeReq(linkId, channel.Id, [userId], [type]));
        return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
    }
    async joinOpenLink(linkId, profileType, passcode = '') {
        let packet;
        if (profileType === open_link_type_1.OpenchatProfileType.MAIN) {
            packet = new packet_join_link_1.PacketJoinLinkReq(linkId, 'EW', passcode, profileType);
        }
        else if (profileType === open_link_type_1.OpenchatProfileType.KAKAO_ANON) {
            packet = new packet_join_link_1.PacketJoinLinkReq(linkId, 'EW', passcode, profileType, arguments[3], arguments[4]);
        }
        else if (profileType === open_link_type_1.OpenchatProfileType.OPEN_PROFILE) {
            packet = new packet_join_link_1.PacketJoinLinkReq(linkId, 'EW', passcode, profileType, '', '', arguments[3]);
        }
        else {
            return null;
        }
        let res = await this.client.NetworkManager.requestPacketRes(packet);
        if (res.StatusCode !== loco_packet_base_1.StatusCode.SUCCESS)
            return null;
        return this.client.ChannelManager.get(res.ChatInfo.ChannelId);
    }
    async changeProfile(channel, profileType) {
        let packet;
        if (profileType === open_link_type_1.OpenchatProfileType.MAIN) {
            packet = new packet_update_openchat_profile_1.PacketUpdateOpenchatProfileReq(channel.LinkId, profileType);
        }
        else if (profileType === open_link_type_1.OpenchatProfileType.KAKAO_ANON) {
            packet = new packet_update_openchat_profile_1.PacketUpdateOpenchatProfileReq(channel.LinkId, profileType, arguments[2], arguments[3]);
        }
        else if (profileType === open_link_type_1.OpenchatProfileType.OPEN_PROFILE) {
            packet = new packet_update_openchat_profile_1.PacketUpdateOpenchatProfileReq(channel.LinkId, profileType, '', '', arguments[2]);
        }
        else {
            return false;
        }
        let res = await this.client.NetworkManager.requestPacketRes(packet);
        let info = await channel.getChannelInfo();
        let userInfo = info.getUserInfo(this.client.ClientUser);
        if (userInfo)
            userInfo.updateFromOpenStruct(res.UpdatedProfile);
        return res.StatusCode === loco_packet_base_1.StatusCode.SUCCESS;
    }
}
exports.OpenChatManager = OpenChatManager;
OpenChatManager.LINK_REGEX = /(http(s)?:\/\/(open.kakao.com\/o)?\/)/g;
//# sourceMappingURL=open-chat-manager.js.map