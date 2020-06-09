import { StructBase } from "./struct-base";
import { UserType } from "../user/user-type";
import { Long } from "bson";
import { OpenMemberType } from "../open/open-link-type";
export declare class MemberStruct implements StructBase {
    UserId: Long;
    NickName: string;
    ProfileImageUrl: string;
    OriginalProfileImageUrl: string;
    FullProfileImageUrl: string;
    Type: UserType;
    AccountId: number;
    LinkedService: string;
    StatusMessage: string;
    OpenProfileToken: number;
    OpenChatMemberType: OpenMemberType;
    ProfileLinkId: Long;
    constructor(UserId?: Long, NickName?: string, ProfileImageUrl?: string, OriginalProfileImageUrl?: string, FullProfileImageUrl?: string, Type?: UserType, AccountId?: number, LinkedService?: string, StatusMessage?: string, OpenProfileToken?: number, OpenChatMemberType?: OpenMemberType, ProfileLinkId?: Long);
    fromJson(rawData: any): void;
    toJson(): any;
}
