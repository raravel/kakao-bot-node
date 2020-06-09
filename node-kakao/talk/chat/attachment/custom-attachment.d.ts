import { ChatType } from "../chat-type";
import { ChatAttachment } from "./chat-attachment";
import { AttachmentContent } from "./chat-attachment";
export declare enum CustomType {
    FEED = "Feed",
    LIST = "List",
    COMMERCE = "Commerce",
    CAROUSEL = "Carousel"
}
export declare enum CustomButtonStyle {
    HORIZONTAL = 0,
    VERTICAL = 1
}
export declare enum CustomButtonDisplayType {
    ALL = "both",
    SENDER_ONLY = "sender",
    RECEIVER = "receiver"
}
export declare enum CustomImageCropStyle {
    CENTER_CROP = 0,
    ORIGINAL = 1
}
export declare abstract class CustomBaseContent implements AttachmentContent {
    abstract readRawContent(rawData: any): void;
    abstract toRawContent(): any;
}
export declare abstract class CustomFragment implements CustomBaseContent {
    abstract readRawContent(rawData: any): void;
    abstract toRawContent(): any;
}
export declare class TextDescFragment extends CustomFragment {
    Text: string;
    Description: string;
    constructor(Text?: string, Description?: string);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class URLFragment extends CustomFragment {
    LinkWin: string;
    LinkMacOS: string;
    LinkAndroid: string;
    LinkIos: string;
    constructor(LinkWin?: string, LinkMacOS?: string, LinkAndroid?: string, LinkIos?: string);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class ImageFragment extends CustomFragment {
    Url: string;
    Width: number;
    Height: number;
    CropStyle: CustomImageCropStyle;
    IsLive: boolean;
    PlayTime: number;
    constructor(Url?: string, Width?: number, Height?: number, CropStyle?: CustomImageCropStyle, IsLive?: boolean, PlayTime?: number);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class ButtonFragment extends CustomFragment {
    Text: string;
    DisplayType?: CustomButtonDisplayType | undefined;
    Link?: URLFragment | undefined;
    constructor(Text?: string, DisplayType?: CustomButtonDisplayType | undefined, Link?: URLFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SocialFragment extends CustomFragment {
    Like: number;
    Comment: number;
    Share: number;
    View: number;
    Subscriber: number;
    constructor(Like?: number, Comment?: number, Share?: number, View?: number, Subscriber?: number);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class ProfileFragment extends CustomFragment {
    TextDesc: TextDescFragment;
    Link?: URLFragment | undefined;
    Background?: ImageFragment | undefined;
    Thumbnail?: ImageFragment | undefined;
    constructor(TextDesc?: TextDescFragment, Link?: URLFragment | undefined, Background?: ImageFragment | undefined, Thumbnail?: ImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class ListHeaderFragment extends CustomFragment {
    TextDesc: TextDescFragment;
    Link?: URLFragment | undefined;
    Background?: ImageFragment | undefined;
    constructor(TextDesc?: TextDescFragment, Link?: URLFragment | undefined, Background?: ImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare abstract class CustomContent extends CustomBaseContent {
    static fromRawContent(rawContent: any, type: CustomType): CustomContent;
}
export declare class CustomFeedContent extends CustomContent {
    TextDesc: TextDescFragment;
    ButtonStyle: CustomButtonStyle;
    ButtonList: ButtonFragment[];
    ThumbnailList: ImageFragment[];
    ExtraThumbCount: number;
    TextLink?: URLFragment | undefined;
    FullText?: boolean | undefined;
    Link?: URLFragment | undefined;
    Profile?: ProfileFragment | undefined;
    Social?: SocialFragment | undefined;
    constructor(TextDesc?: TextDescFragment, ButtonStyle?: CustomButtonStyle, ButtonList?: ButtonFragment[], ThumbnailList?: ImageFragment[], ExtraThumbCount?: number, TextLink?: URLFragment | undefined, FullText?: boolean | undefined, Link?: URLFragment | undefined, Profile?: ProfileFragment | undefined, Social?: SocialFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class ListItemFragment extends CustomFragment {
    Text: TextDescFragment;
    Link?: URLFragment | undefined;
    Thumbnail?: ImageFragment | undefined;
    constructor(Text?: TextDescFragment, Link?: URLFragment | undefined, Thumbnail?: ImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CustomListContent extends CustomContent {
    Header: ListHeaderFragment;
    ItemList: ListItemFragment[];
    ButtonStyle: CustomButtonStyle;
    ButtonList: ButtonFragment[];
    constructor(Header?: ListHeaderFragment, ItemList?: ListItemFragment[], ButtonStyle?: CustomButtonStyle, ButtonList?: ButtonFragment[]);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CommercePriceFragment extends CustomContent {
    RealPrice: number;
    DiscountedPrice: number;
    DiscountRate: number;
    PriceUnit: string;
    UnitFirst: number;
    constructor(RealPrice?: number, DiscountedPrice?: number, DiscountRate?: number, PriceUnit?: string, UnitFirst?: number);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CustomCommerceContent extends CustomContent {
    ThumbnailList: ImageFragment[];
    ExtraThumbCount: number;
    ButtonStyle: CustomButtonStyle;
    ButtonList: ButtonFragment[];
    TextDesc?: TextDescFragment | undefined;
    Price?: CommercePriceFragment | undefined;
    Profile?: ProfileFragment | undefined;
    constructor(ThumbnailList?: ImageFragment[], ExtraThumbCount?: number, ButtonStyle?: CustomButtonStyle, ButtonList?: ButtonFragment[], TextDesc?: TextDescFragment | undefined, Price?: CommercePriceFragment | undefined, Profile?: ProfileFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CarouselCover extends CustomContent {
    Text: TextDescFragment;
    Thumbnail?: ImageFragment | undefined;
    Link?: URLFragment | undefined;
    Background?: ImageFragment | undefined;
    constructor(Text?: TextDescFragment, Thumbnail?: ImageFragment | undefined, Link?: URLFragment | undefined, Background?: ImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CustomCarouselContent extends CustomContent {
    CardType: CustomType;
    ContentList: CustomContent[];
    ContentHead?: CarouselCover | undefined;
    ContentTail?: CarouselCover | undefined;
    constructor(CardType?: CustomType, ContentList?: CustomContent[], ContentHead?: CarouselCover | undefined, ContentTail?: CarouselCover | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CustomInfo implements CustomBaseContent {
    Message: string;
    Type: CustomType;
    ServiceId: string;
    ProviderId: string;
    AndroidVersion: string;
    IosVersion: string;
    WinVersion: string;
    MacVersion: string;
    ServiceNickname?: string | undefined;
    ServiceIcon?: string | undefined;
    ServiceLink?: URLFragment | undefined;
    Link?: URLFragment | undefined;
    Secure?: boolean | undefined;
    Fw?: boolean | undefined;
    Ref: string;
    Ad?: boolean | undefined;
    constructor(Message?: string, Type?: CustomType, ServiceId?: string, ProviderId?: string, AndroidVersion?: string, IosVersion?: string, WinVersion?: string, MacVersion?: string, ServiceNickname?: string | undefined, ServiceIcon?: string | undefined, ServiceLink?: URLFragment | undefined, Link?: URLFragment | undefined, Secure?: boolean | undefined, Fw?: boolean | undefined, Ref?: string, Ad?: boolean | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class KakaoLinkInfo implements CustomBaseContent {
    AppId: string;
    TemplateId?: string | undefined;
    LinkVersion?: string | undefined;
    AppKey?: string | undefined;
    AppVersion?: string | undefined;
    constructor(AppId?: string, TemplateId?: string | undefined, LinkVersion?: string | undefined, AppKey?: string | undefined, AppVersion?: string | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class CustomAttachment implements ChatAttachment {
    Info: CustomInfo;
    Content?: CustomContent | undefined;
    LinkInfo?: KakaoLinkInfo | undefined;
    constructor(Info?: CustomInfo, Content?: CustomContent | undefined, LinkInfo?: KakaoLinkInfo | undefined);
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
    get RequiredMessageType(): ChatType;
}
