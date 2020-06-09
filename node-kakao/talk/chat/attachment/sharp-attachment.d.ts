import { ChatAttachment, AttachmentContent } from "./chat-attachment";
import { ChatType } from "../chat-type";
export declare enum SharpContentType {
    NONE = "",
    LIST = "list",
    IMAGE = "image",
    VIDEO_CLIP = "vclip",
    WEATHER = "weather",
    MOVIE = "movie",
    MEDIA = "media",
    RANK = "rank",
    SIMPLE = "simple"
}
export declare abstract class SharpBaseContent implements AttachmentContent {
    abstract readRawContent(rawData: any): void;
    abstract toRawContent(): any;
}
export declare abstract class SharpContent extends SharpBaseContent {
    abstract readRawContent(rawData: any): void;
    abstract toRawContent(): any;
}
export declare abstract class SharpFragment extends SharpBaseContent {
}
export declare class SharpImageFragment extends SharpFragment {
    ImageURL: string;
    ImageWidth: number;
    ImageHeight: number;
    constructor(ImageURL?: string, ImageWidth?: number, ImageHeight?: number);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpTextFragment extends SharpFragment {
    Text: string;
    Description: string;
    constructor(Text?: string, Description?: string);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpButtonFragment extends SharpFragment {
    Text: string;
    RedirectLink: string;
    Icon: string;
    constructor(Text?: string, RedirectLink?: string, Icon?: string);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpAttachment implements ChatAttachment {
    Question: string;
    RedirectURL: string;
    ContentType: SharpContentType;
    ContentList: SharpContent[];
    MainImage?: SharpImageFragment | undefined;
    Footer?: SharpButtonListContent | undefined;
    constructor(Question?: string, RedirectURL?: string, ContentType?: SharpContentType, ContentList?: SharpContent[], MainImage?: SharpImageFragment | undefined, Footer?: SharpButtonListContent | undefined);
    get RequiredMessageType(): ChatType;
    readAttachment(rawJson: any): void;
    toJsonAttachment(): any;
}
export declare class SharpButtonListContent extends SharpContent {
    ButtonList?: SharpButtonFragment[] | undefined;
    constructor(ButtonList?: SharpButtonFragment[] | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpImageContent extends SharpContent {
    RedirectURL: string;
    Text?: SharpTextFragment | undefined;
    InfoText: string;
    Image?: SharpImageFragment | undefined;
    constructor(RedirectURL?: string, Text?: SharpTextFragment | undefined, InfoText?: string, Image?: SharpImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare enum WeatherIcon {
    CLEAR = "01",
    SUN_SILGHTLY_CLOUDY = "02",
    SUN_CLOUDY = "03",
    CLOUDY = "04",
    SUN_WITH_CLOUD = "05",
    SUN_CLOUDY_2 = "06",
    RAIN = "07",
    CLOUD_RAIN = "08",
    RAIN_UMBRELLA = "09",
    LITTLE_RAIN = "10",
    SNOW = "11",
    CLOUD_SNOW = "12",
    CLOUD_SUN_SNOW = "13",
    SNOW_RAIN = "14",
    CLOUDY_SNOW_RAIN = "15",
    LITTLE_SNOW = "16",
    LIGHTNING = "17",
    FOG = "18",
    HAIL = "19",
    NIGHT_CLEAR = "20",
    NIGHT_SILGHTLY_CLOUDY = "21",
    NIGHT_MOON_CLOUDY = "22",
    MOON_WITH_CLOUD = "23",
    NIGHT_CLOUDY_2 = "24",
    NIGHT_LITTLE_RAIN = "25",
    CLOUD_MOON_SNOW = "26",
    NIGHT_LITTLE_RAIN_2 = "27",
    NIGHT_CLOUDY = "28",
    NIGHT_RAIN = "29",
    NIGHT_CLOUD_RAIN = "30",
    NIGHT_RAIN_UMBRELLA = "31",
    NIGHT_SNOW = "32",
    NIGHT_CLOUD_SNOW = "33",
    NIGHT_SNOW_RAIN = "34",
    NIGHT_CLOUDY_SNOW_RAIN = "35",
    NIGHT_LIGHTNING = "36",
    NIGHT_FOG = "37",
    NIGHT_HAIL = "38"
}
export declare class SharpWeatherFragment extends SharpFragment {
    Icon: WeatherIcon;
    Text: SharpTextFragment;
    Temperature: string;
    constructor(Icon?: WeatherIcon, Text?: SharpTextFragment, Temperature?: string);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpWeatherContent extends SharpContent {
    RedirectURL: string;
    InfoText: string;
    Place: string;
    LastUpdate: string;
    MainWeather: SharpWeatherFragment[];
    SubWeather: SharpWeatherFragment[];
    constructor(RedirectURL?: string, InfoText?: string, Place?: string, LastUpdate?: string, MainWeather?: SharpWeatherFragment[], SubWeather?: SharpWeatherFragment[]);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpSimpleContent extends SharpFragment {
    RedirectURL: string;
    Text: string;
    InfoText: string;
    constructor(RedirectURL?: string, Text?: string, InfoText?: string);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpMediaContent extends SharpContent {
    RedirectURL: string;
    Text?: SharpTextFragment | undefined;
    InfoText: string;
    ExtraInfoList: SharpTextFragment[];
    Image?: SharpImageFragment | undefined;
    constructor(RedirectURL?: string, Text?: SharpTextFragment | undefined, InfoText?: string, ExtraInfoList?: SharpTextFragment[], Image?: SharpImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpMovieContent extends SharpContent {
    RedirectURL: string;
    Text?: SharpTextFragment | undefined;
    InfoText: string;
    StarRate: string;
    ExtraInfoList: SharpTextFragment[];
    ImageList: SharpImageFragment[];
    constructor(RedirectURL?: string, Text?: SharpTextFragment | undefined, InfoText?: string, StarRate?: string, ExtraInfoList?: SharpTextFragment[], ImageList?: SharpImageFragment[]);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpRankContent extends SharpContent {
    RedirectURL: string;
    Text?: SharpTextFragment | undefined;
    StarRate: string;
    Rank: string;
    Image?: SharpImageFragment | undefined;
    constructor(RedirectURL?: string, Text?: SharpTextFragment | undefined, StarRate?: string, Rank?: string, Image?: SharpImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
export declare class SharpVideoContent extends SharpContent {
    RedirectURL: string;
    Text?: SharpTextFragment | undefined;
    InfoText: string;
    PlayTime: number;
    Image?: SharpImageFragment | undefined;
    constructor(RedirectURL?: string, Text?: SharpTextFragment | undefined, InfoText?: string, PlayTime?: number, Image?: SharpImageFragment | undefined);
    readRawContent(rawData: any): void;
    toRawContent(): any;
}
