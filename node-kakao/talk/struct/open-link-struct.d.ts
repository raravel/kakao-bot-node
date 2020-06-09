import { StructBase } from "./struct-base";
import { Long } from "bson";
import { OpenLinkType } from "../open/open-link-type";
export declare class OpenLinkStruct implements StructBase {
    LinkId: Long;
    OpenToken: number;
    LinkName: string;
    LinkURL: string;
    LinkType: OpenLinkType;
    readonly Owner: OpenMemberStruct;
    Description: string;
    CoverURL: string;
    constructor(LinkId?: Long, OpenToken?: number, LinkName?: string, LinkURL?: string, LinkType?: OpenLinkType, Owner?: OpenMemberStruct, Description?: string, CoverURL?: string);
    fromJson(rawData: any): void;
    toJson(): any;
}
export declare class OpenMemberStruct implements StructBase {
    UserId: Long;
    NickName: string;
    ProfileImageUrl: string;
    OriginalProfileImageUrl: string;
    FullProfileImageUrl: string;
    MemberType: number;
    OpenChatToken: number;
    constructor(UserId?: Long, NickName?: string, ProfileImageUrl?: string, OriginalProfileImageUrl?: string, FullProfileImageUrl?: string, MemberType?: number, OpenChatToken?: number);
    fromJson(rawData: any): void;
    toJson(): any;
}
