import { StructBase } from "./struct-base";
import { Long } from "bson";
export declare class ClientSettingsStruct implements StructBase {
    Status: number;
    AllowPay: boolean;
    AllowStory: boolean;
    AllowStoryPost: boolean;
    BackgroundImageURL: string;
    OriginalBackgroundImageURL: string;
    ProfileImageURL: string;
    FullProfileImageURL: string;
    OriginalProfileImageURL: string;
    StatusMessage: string;
    StoryURL: string;
    Suspended: boolean;
    UserId: Long;
    constructor(Status?: number, AllowPay?: boolean, AllowStory?: boolean, AllowStoryPost?: boolean, BackgroundImageURL?: string, OriginalBackgroundImageURL?: string, ProfileImageURL?: string, FullProfileImageURL?: string, OriginalProfileImageURL?: string, StatusMessage?: string, StoryURL?: string, Suspended?: boolean, UserId?: Long);
    fromJson(rawData: any): void;
    toJson(): {
        status: number;
        allowPay: boolean;
        allowStory: boolean;
        allowStoryPost: boolean;
        backgroundImageUrl: string;
        originalBackgroundImageUrl: string;
        profileImageUrl: string;
        fullProfileImageUrl: string;
        originalProfileImageUrl: string;
        statusMessage: string;
        storyWebUrl: string;
        suspended: boolean;
        userId: Long;
    };
}
