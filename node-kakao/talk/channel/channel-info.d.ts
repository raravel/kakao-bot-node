import { ChatUser, UserInfo } from "../user/chat-user";
import { ChannelMetaStruct, ChatInfoStruct } from "../struct/chat-info-struct";
import { Long } from "bson";
import { MemberStruct } from "../struct/member-struct";
import { ChannelType } from "../chat/channel-type";
import { ChatChannel, OpenChatChannel } from "./chat-channel";
import { PacketChatOnRoomRes } from "../../packet/packet-chat-on-room";
import { OpenMemberType } from "../open/open-link-type";
export declare class ChannelInfo {
    private channel;
    private lastInfoUpdated;
    private roomImageURL;
    private roomFullImageURL;
    private name;
    private isFavorite;
    private isDirectChan;
    private chatmetaList;
    private userInfoMap;
    private clientUserInfo;
    private pendingInfoReq;
    private pendingUserInfoReq;
    constructor(channel: ChatChannel);
    get Channel(): ChatChannel;
    get Name(): string;
    get RoomImageURL(): string;
    get RoomFullImageURL(): string;
    get IsFavorite(): boolean;
    get RoomType(): ChannelType;
    get IsDirectChan(): boolean;
    get LastInfoUpdated(): number;
    get UserIdList(): Long[];
    get ChatMetaList(): ChannelMetaStruct[];
    hasUserInfo(id: Long): boolean;
    get ClientUserInfo(): UserInfo;
    getUserInfo(user: ChatUser): UserInfo | null;
    getUserInfoId(id: Long): UserInfo | null;
    addUserInfo(userId: Long): Promise<void>;
    removeUserInfo(id: Long): boolean;
    updateFromStruct(chatinfoStruct: ChatInfoStruct): void;
    protected updateRoomName(name: string): void;
    protected initUserInfo(memberStruct: MemberStruct): void;
    updateInfo(): Promise<void>;
    protected updateFromChatOnRoom(res: PacketChatOnRoomRes): void;
    protected updateChannelInfo(): Promise<void>;
    protected updateMemberInfo(): Promise<void>;
}
export declare class OpenChannelInfo extends ChannelInfo {
    private linkInfo;
    private memberTypeMap;
    get Channel(): OpenChatChannel;
    get CoverURL(): string;
    get LinkURL(): string;
    get LinkOwner(): ChatUser;
    canManageChannel(user: ChatUser): boolean;
    canManageChannelId(userId: Long): boolean;
    isManager(user: ChatUser): boolean;
    isManagerId(userId: Long): boolean;
    protected initUserInfo(memberStruct: MemberStruct): void;
    updateMemberType(userId: Long, memberType: OpenMemberType): void;
    getMemberType(user: ChatUser): OpenMemberType;
    getMemberTypeId(userId: Long): OpenMemberType;
    updateChannelInfo(): Promise<void>;
    protected updateFromChatOnRoom(res: PacketChatOnRoomRes): Promise<void>;
}