"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocoPacketList = void 0;
const packet_get_conf_1 = require("./packet-get-conf");
const packet_check_in_1 = require("./packet-check-in");
const packet_login_1 = require("./packet-login");
const packet_message_1 = require("./packet-message");
const packet_message_read_1 = require("./packet-message-read");
const packet_kickout_1 = require("./packet-kickout");
const packet_invoice_1 = require("./packet-invoice");
const packet_new_member_1 = require("./packet-new-member");
const packet_leave_1 = require("./packet-leave");
const packet_chat_member_1 = require("./packet-chat-member");
const packet_chatinfo_1 = require("./packet-chatinfo");
const packet_chan_join_1 = require("./packet-chan-join");
const packet_get_member_1 = require("./packet-get-member");
const loco_bson_packet_1 = require("./loco-bson-packet");
const packet_get_meta_1 = require("./packet-get-meta");
const packet_get_channel_board_meta_1 = require("./packet-get-channel-board-meta");
const packet_sync_link_1 = require("./packet-sync-link");
const packet_rewrite_1 = require("./packet-rewrite");
const packet_kick_member_1 = require("./packet-kick-member");
const packet_delete_link_1 = require("./packet-delete-link");
const packet_delete_chat_1 = require("./packet-delete-chat");
const packet_member_1 = require("./packet-member");
const packet_ping_1 = require("./packet-ping");
const packet_info_link_1 = require("./packet-info-link");
const packet_create_chat_1 = require("./packet-create-chat");
const packet_sync_join_openchat_1 = require("./packet-sync-join-openchat");
const packet_delmem_1 = require("./packet-delmem");
const loco_noti_read_1 = require("./loco-noti-read");
const packet_join_info_1 = require("./packet-join-info");
const packet_set_mem_type_1 = require("./packet-set-mem-type");
const packet_link_kicked_1 = require("./packet-link-kicked");
const packet_join_link_1 = require("./packet-join-link");
const packet_update_openchat_profile_1 = require("./packet-update-openchat-profile");
const packet_sync_member_type_1 = require("./packet-sync-member-type");
const packet_chat_on_room_1 = require("./packet-chat-on-room");
const packet_sync_profile_1 = require("./packet-sync-profile");
const packet_sync_delete_message_1 = require("./packet-sync-delete-message");
const packet_sync_message_1 = require("./packet-sync-message");
class LocoPacketList {
    static init() {
        LocoPacketList.initReqMap();
        LocoPacketList.initResMap();
    }
    static initReqMap() {
        LocoPacketList.requestPacketMap = new Map();
        LocoPacketList.defaultBodyReqPacketMap = new Map();
        LocoPacketList.defaultBodyReqPacketMap.set(0, loco_bson_packet_1.DefaultBsonRequestPacket);
        LocoPacketList.requestPacketMap.set('GETCONF', packet_get_conf_1.PacketGetConfReq);
        LocoPacketList.requestPacketMap.set('CHECKIN', packet_check_in_1.PacketCheckInReq);
        LocoPacketList.requestPacketMap.set('LOGINLIST', packet_login_1.PacketLoginReq);
        LocoPacketList.requestPacketMap.set('WRITE', packet_message_1.PacketMessageWriteReq);
        LocoPacketList.requestPacketMap.set('MEMBER', packet_chat_member_1.PacketChatMemberReq);
        LocoPacketList.requestPacketMap.set('CHATINFO', packet_chatinfo_1.PacketChatInfoReq);
        LocoPacketList.requestPacketMap.set('GETMETA', packet_get_meta_1.PacketGetMetaReq);
        LocoPacketList.requestPacketMap.set('GETMETAS', packet_get_meta_1.PacketGetMetasReq);
        LocoPacketList.requestPacketMap.set('GETMEM', packet_get_member_1.PacketGetMemberReq);
        LocoPacketList.requestPacketMap.set('MEMBER', packet_member_1.PacketMemberReq);
        LocoPacketList.requestPacketMap.set('GETMOMETA', packet_get_channel_board_meta_1.PacketGetChannelBoardMetaReq);
        LocoPacketList.requestPacketMap.set('SYNCLINK', packet_sync_link_1.PacketSyncLinkReq);
        LocoPacketList.requestPacketMap.set('REWRITE', packet_rewrite_1.PacketRewriteReq);
        LocoPacketList.requestPacketMap.set('CREATE', packet_create_chat_1.PacketCreateChatReq);
        LocoPacketList.requestPacketMap.set('KICKMEM', packet_kick_member_1.PacketKickMemberReq);
        LocoPacketList.requestPacketMap.set('DELETELINK', packet_delete_link_1.PacketDeleteLinkReq);
        LocoPacketList.requestPacketMap.set('INFOLINK', packet_info_link_1.PacketInfoLinkReq);
        LocoPacketList.requestPacketMap.set('JOININFO', packet_join_info_1.PacketJoinInfoReq);
        LocoPacketList.requestPacketMap.set('SETMEMTYPE', packet_set_mem_type_1.PacketSetMemTypeReq);
        LocoPacketList.requestPacketMap.set('JOINLINK', packet_join_link_1.PacketJoinLinkReq);
        LocoPacketList.requestPacketMap.set('UPLINKPROF', packet_update_openchat_profile_1.PacketUpdateOpenchatProfileReq);
        LocoPacketList.requestPacketMap.set('SYNCMSG', packet_sync_message_1.PacketSyncMessageReq);
        LocoPacketList.requestPacketMap.set('DELETEMSG', packet_delete_link_1.PacketDeleteLinkReq);
        LocoPacketList.requestPacketMap.set('NOTIREAD', loco_noti_read_1.PacketMessageNotiReadReq);
        LocoPacketList.requestPacketMap.set('CHATONROOM', packet_chat_on_room_1.PacketChatOnRoomReq);
        LocoPacketList.requestPacketMap.set('PING', packet_ping_1.PacketPingReq);
        LocoPacketList.requestPacketMap.set('LEAVE', packet_leave_1.PacketLeaveReq);
    }
    static initResMap() {
        LocoPacketList.responsePacketMap = new Map();
        LocoPacketList.defaultBodyResPacketMap = new Map();
        LocoPacketList.defaultBodyResPacketMap.set(0, loco_bson_packet_1.DefaultBsonResponsePacket);
        LocoPacketList.defaultBodyResPacketMap.set(8, loco_bson_packet_1.DefaultBsonResponsePacket);
        LocoPacketList.responsePacketMap.set('GETCONF', packet_get_conf_1.PacketGetConfRes);
        LocoPacketList.responsePacketMap.set('CHECKIN', packet_check_in_1.PacketCheckInRes);
        LocoPacketList.responsePacketMap.set('LOGINLIST', packet_login_1.PacketLoginRes);
        LocoPacketList.responsePacketMap.set('MSG', packet_message_1.PacketMessageRes);
        LocoPacketList.responsePacketMap.set('WRITE', packet_message_1.PacketMessageWriteRes);
        LocoPacketList.responsePacketMap.set('NOTIREAD', loco_noti_read_1.PacketMessageNotiReadRes);
        LocoPacketList.responsePacketMap.set('DECUNREAD', packet_message_read_1.PacketMessageReadRes);
        LocoPacketList.responsePacketMap.set('MEMBER', packet_chat_member_1.PacketChatMemberRes);
        LocoPacketList.responsePacketMap.set('CHATINFO', packet_chatinfo_1.PacketChatInfoRes);
        LocoPacketList.responsePacketMap.set('GETMETA', packet_get_meta_1.PacketGetMetaRes);
        LocoPacketList.responsePacketMap.set('GETMETAS', packet_get_meta_1.PacketGetMetasRes);
        LocoPacketList.responsePacketMap.set('GETMEM', packet_get_member_1.PacketGetMemberRes);
        LocoPacketList.responsePacketMap.set('MEMBER', packet_member_1.PacketMemberRes);
        LocoPacketList.responsePacketMap.set('GETMOMETA', packet_get_channel_board_meta_1.PacketGetMoimMetaRes);
        LocoPacketList.responsePacketMap.set('JOININFO', packet_join_info_1.PacketJoinInfoRes);
        LocoPacketList.responsePacketMap.set('KICKMEM', packet_kick_member_1.PacketKickMemberRes);
        LocoPacketList.responsePacketMap.set('CREATE', packet_create_chat_1.PacketCreateChatRes);
        LocoPacketList.responsePacketMap.set('NEWMEM', packet_new_member_1.PacketNewMemberRes);
        LocoPacketList.responsePacketMap.set('LEFT', packet_leave_1.PacketLeftRes);
        LocoPacketList.responsePacketMap.set('LEAVE', packet_leave_1.PacketLeaveRes);
        LocoPacketList.responsePacketMap.set('SYNCJOIN', packet_chan_join_1.PacketChanJoinRes);
        LocoPacketList.responsePacketMap.set('SYNCLINK', packet_sync_link_1.PacketSyncLinkRes);
        LocoPacketList.responsePacketMap.set('INFOLINK', packet_info_link_1.PacketInfoLinkRes);
        LocoPacketList.responsePacketMap.set('DELETELINK', packet_delete_link_1.PacketDeleteLinkRes);
        LocoPacketList.responsePacketMap.set('REWRITE', packet_rewrite_1.PacketRewriteRes);
        LocoPacketList.responsePacketMap.set('SETMEMTYPE', packet_set_mem_type_1.PacketSetMemTypeRes);
        LocoPacketList.responsePacketMap.set('LINKKICKED', packet_link_kicked_1.PacketLinkKickedRes);
        LocoPacketList.responsePacketMap.set('JOINLINK', packet_join_link_1.PacketJoinLinkRes);
        LocoPacketList.responsePacketMap.set('UPLINKPROF', packet_update_openchat_profile_1.PacketUpdateOpenchatProfileRes);
        LocoPacketList.responsePacketMap.set('SYNCLINKPF', packet_sync_profile_1.PacketSyncProfileRes);
        LocoPacketList.responsePacketMap.set('CHATONROOM', packet_chat_on_room_1.PacketChatOnRoomRes);
        LocoPacketList.responsePacketMap.set('SYNCMEMT', packet_sync_member_type_1.PacketSyncMemberTypeRes);
        LocoPacketList.responsePacketMap.set('INVOICE', packet_invoice_1.PacketInvoiceRes);
        LocoPacketList.responsePacketMap.set('DELETEMSG', packet_delete_chat_1.PacketDeleteChatRes);
        LocoPacketList.responsePacketMap.set('SYNCDLMSG', packet_sync_delete_message_1.PacketSyncDeleteMessageRes);
        LocoPacketList.responsePacketMap.set('SYNCLINKCR', packet_sync_join_openchat_1.PacketSyncJoinOpenchatRes);
        LocoPacketList.responsePacketMap.set('SYNCMSG', packet_sync_message_1.PacketSyncMessageRes);
        LocoPacketList.responsePacketMap.set('DELMEM', packet_delmem_1.PacketDeleteMemberRes);
        LocoPacketList.responsePacketMap.set('PING', packet_ping_1.PacketPingRes);
        LocoPacketList.responsePacketMap.set('KICKOUT', packet_kickout_1.PacketKickoutRes);
    }
    static hasReqPacket(name) {
        return LocoPacketList.requestPacketMap && LocoPacketList.requestPacketMap.has(name);
    }
    static hasResPacket(name) {
        return LocoPacketList.responsePacketMap && LocoPacketList.responsePacketMap.has(name);
    }
    static hasReqBodyType(type) {
        return LocoPacketList.defaultBodyReqPacketMap && LocoPacketList.defaultBodyReqPacketMap.has(type);
    }
    static hasResBodyType(type) {
        return LocoPacketList.defaultBodyResPacketMap && LocoPacketList.defaultBodyResPacketMap.has(type);
    }
    static getReqPacketByName(name) {
        if (!LocoPacketList.hasReqPacket(name)) {
            throw new Error(`${name} is not valid loco request packet`);
        }
        return new (LocoPacketList.requestPacketMap.get(name))();
    }
    static getResPacketByName(name, status) {
        if (!LocoPacketList.hasResPacket(name)) {
            throw new Error(`${name} is not valid loco response packet`);
        }
        return new (LocoPacketList.responsePacketMap.get(name))(status);
    }
    static getDefaultReqPacket(bodyType, packetName) {
        if (!LocoPacketList.hasReqBodyType(bodyType)) {
            throw new Error(`${bodyType} is not valid loco packet type`);
        }
        return new (LocoPacketList.defaultBodyReqPacketMap.get(bodyType))(packetName);
    }
    static getDefaultResPacket(bodyType, packetName, status) {
        if (!LocoPacketList.hasResBodyType(bodyType)) {
            throw new Error(`${bodyType} is not valid loco packet type`);
        }
        return new (LocoPacketList.defaultBodyResPacketMap.get(bodyType))(status, packetName);
    }
}
exports.LocoPacketList = LocoPacketList;
LocoPacketList.init();
//# sourceMappingURL=loco-packet-list.js.map