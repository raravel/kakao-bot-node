"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAttachment = exports.KakaoLinkInfo = exports.CustomInfo = exports.CustomCarouselContent = exports.CarouselCover = exports.CustomCommerceContent = exports.CommercePriceFragment = exports.CustomListContent = exports.ListItemFragment = exports.CustomFeedContent = exports.CustomContent = exports.ListHeaderFragment = exports.ProfileFragment = exports.SocialFragment = exports.ButtonFragment = exports.ImageFragment = exports.URLFragment = exports.TextDescFragment = exports.CustomFragment = exports.CustomBaseContent = exports.CustomImageCropStyle = exports.CustomButtonDisplayType = exports.CustomButtonStyle = exports.CustomType = void 0;
const chat_type_1 = require("../chat-type");
var CustomType;
(function (CustomType) {
    CustomType["FEED"] = "Feed";
    CustomType["LIST"] = "List";
    CustomType["COMMERCE"] = "Commerce";
    CustomType["CAROUSEL"] = "Carousel";
})(CustomType = exports.CustomType || (exports.CustomType = {}));
var CustomButtonStyle;
(function (CustomButtonStyle) {
    CustomButtonStyle[CustomButtonStyle["HORIZONTAL"] = 0] = "HORIZONTAL";
    CustomButtonStyle[CustomButtonStyle["VERTICAL"] = 1] = "VERTICAL";
})(CustomButtonStyle = exports.CustomButtonStyle || (exports.CustomButtonStyle = {}));
var CustomButtonDisplayType;
(function (CustomButtonDisplayType) {
    CustomButtonDisplayType["ALL"] = "both";
    CustomButtonDisplayType["SENDER_ONLY"] = "sender";
    CustomButtonDisplayType["RECEIVER"] = "receiver";
})(CustomButtonDisplayType = exports.CustomButtonDisplayType || (exports.CustomButtonDisplayType = {}));
var CustomImageCropStyle;
(function (CustomImageCropStyle) {
    CustomImageCropStyle[CustomImageCropStyle["CENTER_CROP"] = 0] = "CENTER_CROP";
    CustomImageCropStyle[CustomImageCropStyle["ORIGINAL"] = 1] = "ORIGINAL";
})(CustomImageCropStyle = exports.CustomImageCropStyle || (exports.CustomImageCropStyle = {}));
class CustomBaseContent {
}
exports.CustomBaseContent = CustomBaseContent;
class CustomFragment {
}
exports.CustomFragment = CustomFragment;
class TextDescFragment extends CustomFragment {
    constructor(Text = '', Description = '') {
        super();
        this.Text = Text;
        this.Description = Description;
    }
    readRawContent(rawData) {
        this.Text = rawData['T'];
        if (rawData['D'])
            this.Description = rawData['D'];
    }
    toRawContent() {
        let obj = {
            'T': this.Text
        };
        if (this.Description)
            obj['D'] = this.Description;
        return obj;
    }
}
exports.TextDescFragment = TextDescFragment;
class URLFragment extends CustomFragment {
    constructor(LinkWin = '', LinkMacOS = LinkWin, LinkAndroid = LinkWin, LinkIos = LinkAndroid) {
        super();
        this.LinkWin = LinkWin;
        this.LinkMacOS = LinkMacOS;
        this.LinkAndroid = LinkAndroid;
        this.LinkIos = LinkIos;
    }
    readRawContent(rawData) {
        if (rawData['LPC'])
            this.LinkWin = rawData['LPC'];
        if (rawData['LMO'])
            this.LinkMacOS = rawData['LMO'];
        if (rawData['LCA'])
            this.LinkAndroid = rawData['LCA'];
        if (rawData['LCI'])
            this.LinkIos = rawData['LCI'];
    }
    toRawContent() {
        let obj = {};
        if (this.LinkWin !== '')
            obj['LPC'] = this.LinkWin;
        if (this.LinkMacOS !== '')
            obj['LMO'] = this.LinkMacOS;
        if (this.LinkAndroid !== '')
            obj['LCA'] = this.LinkAndroid;
        if (this.LinkIos !== '')
            obj['LCI'] = this.LinkIos;
        return obj;
    }
}
exports.URLFragment = URLFragment;
class ImageFragment extends CustomFragment {
    constructor(Url = '', Width = 0, Height = 0, CropStyle = CustomImageCropStyle.ORIGINAL, IsLive = false, PlayTime = 0) {
        super();
        this.Url = Url;
        this.Width = Width;
        this.Height = Height;
        this.CropStyle = CropStyle;
        this.IsLive = IsLive;
        this.PlayTime = PlayTime;
    }
    readRawContent(rawData) {
        this.Url = rawData['THU'];
        this.Width = rawData['W'];
        this.Height = rawData['H'];
        this.CropStyle = rawData['SC'];
        this.IsLive = rawData['LI'];
        this.PlayTime = rawData['PT'];
    }
    toRawContent() {
        let obj = {
            'THU': this.Url,
            'W': this.Width,
            'H': this.Height,
            'SC': this.CropStyle,
            'LI': this.IsLive,
            'PlayTime': this.PlayTime
        };
        return obj;
    }
}
exports.ImageFragment = ImageFragment;
class ButtonFragment extends CustomFragment {
    constructor(Text = '', DisplayType, Link) {
        super();
        this.Text = Text;
        this.DisplayType = DisplayType;
        this.Link = Link;
    }
    readRawContent(rawData) {
        if (rawData['BU']) {
            if (rawData['BU']['T'])
                this.Text = rawData['BU']['T'];
            if (rawData['BU']['SR'])
                this.DisplayType = rawData['BU']['SR'];
        }
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
    }
    toRawContent() {
        let obj = {
            'BU': { 'T': this.Text }
        };
        if (this.DisplayType)
            obj['BU']['SR'] = this.DisplayType;
        if (this.Link)
            obj['L'] = this.Link.toRawContent();
        return obj;
    }
}
exports.ButtonFragment = ButtonFragment;
class SocialFragment extends CustomFragment {
    constructor(Like = 0, Comment = 0, Share = 0, View = 0, Subscriber = 0) {
        super();
        this.Like = Like;
        this.Comment = Comment;
        this.Share = Share;
        this.View = View;
        this.Subscriber = Subscriber;
    }
    readRawContent(rawData) {
        if (rawData['LK'])
            this.Like = rawData['LK'];
        if (rawData['CM'])
            this.Comment = rawData['CM'];
        if (rawData['SH'])
            this.Share = rawData['SH'];
        if (rawData['VC'])
            this.View = rawData['VC'];
        if (rawData['SB'])
            this.Subscriber = rawData['SB'];
    }
    toRawContent() {
        let obj = {};
        if (this.Like)
            obj['LK'] = this.Like;
        if (this.Comment)
            obj['CM'] = this.Comment;
        if (this.Share)
            obj['SH'] = this.Share;
        if (this.View)
            obj['VC'] = this.View;
        if (this.Subscriber)
            obj['SB'] = this.Subscriber;
        return obj;
    }
}
exports.SocialFragment = SocialFragment;
class ProfileFragment extends CustomFragment {
    constructor(TextDesc = new TextDescFragment(), Link, Background, Thumbnail) {
        super();
        this.TextDesc = TextDesc;
        this.Link = Link;
        this.Background = Background;
        this.Thumbnail = Thumbnail;
    }
    readRawContent(rawData) {
        if (rawData['TD']) {
            this.TextDesc.readRawContent(rawData['TD']);
        }
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
        if (rawData['BG']) {
            this.Background = new ImageFragment();
            this.Background.readRawContent(rawData['BG']);
        }
        if (rawData['TH']) {
            this.Thumbnail = new ImageFragment();
            this.Thumbnail.readRawContent(rawData['TH']);
        }
    }
    toRawContent() {
        let obj = {
            'TD': this.TextDesc.toRawContent()
        };
        if (this.Link)
            obj['L'] = this.Link.toRawContent();
        if (this.Background)
            obj['BG'] = this.Background.toRawContent();
        if (this.Thumbnail)
            obj['TH'] = this.Thumbnail.toRawContent();
        return obj;
    }
}
exports.ProfileFragment = ProfileFragment;
class ListHeaderFragment extends CustomFragment {
    constructor(TextDesc = new TextDescFragment(), Link, Background) {
        super();
        this.TextDesc = TextDesc;
        this.Link = Link;
        this.Background = Background;
    }
    readRawContent(rawData) {
        if (rawData['TD']) {
            this.TextDesc.readRawContent(rawData['TD']);
        }
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
        if (rawData['BG']) {
            this.Background = new ImageFragment();
            this.Background.readRawContent(rawData['BG']);
        }
    }
    toRawContent() {
        let obj = {
            'TD': this.TextDesc.toRawContent()
        };
        if (this.Link)
            obj['L'] = this.Link.toRawContent();
        if (this.Background)
            obj['BG'] = this.Background.toRawContent();
        return obj;
    }
}
exports.ListHeaderFragment = ListHeaderFragment;
class CustomContent extends CustomBaseContent {
    static fromRawContent(rawContent, type) {
        let content;
        switch (type) {
            case CustomType.CAROUSEL:
                content = new CustomCarouselContent();
                break;
            case CustomType.LIST:
                content = new CustomListContent();
                break;
            case CustomType.COMMERCE:
                content = new CustomCommerceContent();
                break;
            case CustomType.FEED:
            default:
                content = new CustomFeedContent();
                break;
        }
        content.readRawContent(rawContent);
        return content;
    }
}
exports.CustomContent = CustomContent;
class CustomFeedContent extends CustomContent {
    constructor(TextDesc = new TextDescFragment(), ButtonStyle = CustomButtonStyle.HORIZONTAL, ButtonList = [], ThumbnailList = [], ExtraThumbCount = 0, TextLink, FullText, Link, Profile, Social) {
        super();
        this.TextDesc = TextDesc;
        this.ButtonStyle = ButtonStyle;
        this.ButtonList = ButtonList;
        this.ThumbnailList = ThumbnailList;
        this.ExtraThumbCount = ExtraThumbCount;
        this.TextLink = TextLink;
        this.FullText = FullText;
        this.Link = Link;
        this.Profile = Profile;
        this.Social = Social;
    }
    readRawContent(rawData) {
        if (rawData['TI']) {
            if (rawData['TI']['TD'])
                this.TextDesc.readRawContent(rawData['TI']['TD']);
            if (rawData['TI']['L']) {
                this.TextLink = new URLFragment();
                this.TextLink.readRawContent(rawData['TI']['L']);
            }
            if (rawData['TI']['FT'])
                this.FullText = rawData['TI']['FT'];
        }
        this.ButtonStyle = rawData['BUT'];
        if (rawData['BUL']) {
            this.ButtonList = [];
            for (let rawButton of rawData['BUL']) {
                if (!rawButton)
                    continue;
                let btn = new ButtonFragment();
                btn.readRawContent(rawButton);
                this.ButtonList.push(btn);
            }
        }
        if (rawData['THC'])
            this.ExtraThumbCount = rawData['THC'];
        if (rawData['THL']) {
            this.ThumbnailList = [];
            for (let rawImg of rawData['THL']) {
                if (rawImg['TH']) {
                    let img = new ImageFragment();
                    img.readRawContent(rawImg['TH']);
                    this.ThumbnailList.push(img);
                }
            }
        }
        if (rawData['SO']) {
            this.Social = new SocialFragment();
            this.Social.readRawContent(rawData['SO']);
        }
        if (rawData['PR']) {
            this.Profile = new ProfileFragment();
            this.Profile.readRawContent(rawData['PR']);
        }
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
    }
    toRawContent() {
        let textItem = {};
        textItem['TD'] = this.TextDesc.toRawContent();
        if (this.TextLink)
            textItem['L'] = this.TextLink.toRawContent();
        if (typeof (this.FullText) !== 'undefined')
            textItem['FT'] = this.FullText;
        let obj = {
            'TI': textItem,
            'BUT': this.ButtonStyle
        };
        if (this.ExtraThumbCount)
            obj['THC'] = this.ExtraThumbCount;
        let thumbList = [];
        for (let thumb of this.ThumbnailList) {
            thumbList.push({ 'TH': thumb.toRawContent() });
        }
        obj['THL'] = thumbList;
        let buttonList = [];
        for (let btn of this.ButtonList) {
            buttonList.push(btn.toRawContent());
        }
        obj['BUL'] = buttonList;
        if (this.Link)
            obj['L'] = this.Link.toRawContent();
        if (this.Profile)
            obj['PR'] = this.Profile.toRawContent();
        if (this.Social)
            obj['SO'] = this.Social.toRawContent();
        return obj;
    }
}
exports.CustomFeedContent = CustomFeedContent;
class ListItemFragment extends CustomFragment {
    constructor(Text = new TextDescFragment(), Link, Thumbnail) {
        super();
        this.Text = Text;
        this.Link = Link;
        this.Thumbnail = Thumbnail;
    }
    readRawContent(rawData) {
        if (rawData['TD'])
            this.Text.readRawContent(rawData['TD']);
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
        if (rawData['TH']) {
            this.Thumbnail = new ImageFragment();
            this.Thumbnail.readRawContent(rawData['TH']);
        }
    }
    toRawContent() {
        let obj = {
            'TD': this.Text.toRawContent()
        };
        if (this.Link) {
            obj['L'] = this.Link.toRawContent();
        }
        if (this.Thumbnail) {
            obj['TH'] = this.Thumbnail.toRawContent();
        }
        return obj;
    }
}
exports.ListItemFragment = ListItemFragment;
class CustomListContent extends CustomContent {
    constructor(Header = new ListHeaderFragment(), ItemList = [], ButtonStyle = CustomButtonStyle.HORIZONTAL, ButtonList = []) {
        super();
        this.Header = Header;
        this.ItemList = ItemList;
        this.ButtonStyle = ButtonStyle;
        this.ButtonList = ButtonList;
    }
    readRawContent(rawData) {
        if (rawData['HD']) {
            this.Header.readRawContent(rawData['HD']);
        }
        this.ButtonStyle = rawData['BUT'];
        if (rawData['BUL']) {
            this.ButtonList = [];
            for (let rawButton of rawData['BUL']) {
                if (!rawButton)
                    continue;
                let btn = new ButtonFragment();
                btn.readRawContent(rawButton);
                this.ButtonList.push(btn);
            }
        }
        if (rawData['ITL']) {
            this.ItemList = [];
            for (let rawItem of rawData['ITL']) {
                if (!rawItem)
                    continue;
                let item = new ListItemFragment();
                item.readRawContent(rawItem);
                this.ItemList.push(item);
            }
        }
    }
    toRawContent() {
        let obj = {
            'HD': this.Header.toRawContent(),
            'BUT': this.ButtonStyle
        };
        let buttonList = [];
        for (let btn of this.ButtonList) {
            buttonList.push(btn.toRawContent());
        }
        obj['BUL'] = buttonList;
        let itemList = [];
        for (let item of this.ItemList) {
            itemList.push(item.toRawContent());
        }
        obj['ITL'] = itemList;
        return obj;
    }
}
exports.CustomListContent = CustomListContent;
class CommercePriceFragment extends CustomContent {
    constructor(RealPrice = 0, DiscountedPrice = 0, DiscountRate = 0, PriceUnit = '', UnitFirst = 0) {
        super();
        this.RealPrice = RealPrice;
        this.DiscountedPrice = DiscountedPrice;
        this.DiscountRate = DiscountRate;
        this.PriceUnit = PriceUnit;
        this.UnitFirst = UnitFirst;
    }
    readRawContent(rawData) {
        this.RealPrice = rawData['RP'];
        this.DiscountedPrice = rawData['DP'];
        this.DiscountRate = rawData['DR'];
        this.PriceUnit = rawData['CU'];
        this.UnitFirst = rawData['CP'];
    }
    toRawContent() {
        let obj = {
            'RP': this.RealPrice,
            'DP': this.DiscountedPrice,
            'DR': this.DiscountRate,
            'CU': this.PriceUnit,
            'CP': this.UnitFirst
        };
        return obj;
    }
}
exports.CommercePriceFragment = CommercePriceFragment;
class CustomCommerceContent extends CustomContent {
    constructor(ThumbnailList = [], ExtraThumbCount = 0, ButtonStyle = CustomButtonStyle.HORIZONTAL, ButtonList = [], TextDesc, Price, Profile) {
        super();
        this.ThumbnailList = ThumbnailList;
        this.ExtraThumbCount = ExtraThumbCount;
        this.ButtonStyle = ButtonStyle;
        this.ButtonList = ButtonList;
        this.TextDesc = TextDesc;
        this.Price = Price;
        this.Profile = Profile;
    }
    readRawContent(rawData) {
        if (rawData['TI']) {
            if (rawData['TI']['TD']) {
                this.TextDesc = new TextDescFragment();
                this.TextDesc.readRawContent(rawData['TI']['TD']);
            }
        }
        this.ButtonStyle = rawData['BUT'];
        if (rawData['BUL']) {
            this.ButtonList = [];
            for (let rawButton of rawData['BUL']) {
                if (!rawButton)
                    continue;
                let btn = new ButtonFragment();
                btn.readRawContent(rawButton);
                this.ButtonList.push(btn);
            }
        }
        if (rawData['THC'])
            this.ExtraThumbCount = rawData['THC'];
        if (rawData['THL']) {
            this.ThumbnailList = [];
            for (let rawImg of rawData['THL']) {
                if (rawImg['TH']) {
                    let img = new ImageFragment();
                    img.readRawContent(rawImg['TH']);
                    this.ThumbnailList.push(img);
                }
            }
        }
        if (rawData['PR']) {
            this.Profile = new ProfileFragment();
            this.Profile.readRawContent(rawData['PR']);
        }
        if (rawData['CMC']) {
            this.Price = new CommercePriceFragment();
            this.Price.readRawContent(rawData['CMC']);
        }
    }
    toRawContent() {
        let textItem = {};
        if (this.TextDesc) {
            textItem['TD'] = this.TextDesc.toRawContent();
        }
        let obj = {
            'TI': textItem,
            'BUT': this.ButtonStyle
        };
        if (this.ExtraThumbCount)
            obj['THC'] = this.ExtraThumbCount;
        let thumbList = [];
        for (let thumb of this.ThumbnailList) {
            thumbList.push({ 'TH': thumb.toRawContent() });
        }
        obj['THL'] = thumbList;
        let buttonList = [];
        for (let btn of this.ButtonList) {
            buttonList.push(btn.toRawContent());
        }
        obj['BUL'] = buttonList;
        if (this.Profile) {
            obj['PR'] = this.Profile.toRawContent();
        }
        if (this.Price) {
            obj['CMC'] = this.Price.toRawContent();
        }
        return obj;
    }
}
exports.CustomCommerceContent = CustomCommerceContent;
class CarouselCover extends CustomContent {
    constructor(Text = new TextDescFragment(), Thumbnail, Link, Background) {
        super();
        this.Text = Text;
        this.Thumbnail = Thumbnail;
        this.Link = Link;
        this.Background = Background;
    }
    readRawContent(rawData) {
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
        if (rawData['TD'])
            this.Text.readRawContent(rawData['TD']);
        if (rawData['TH']) {
            this.Thumbnail = new ImageFragment();
            this.Thumbnail.readRawContent(rawData['TH']);
        }
        if (rawData['BG']) {
            this.Background = new ImageFragment();
            this.Background.readRawContent(rawData['BG']);
        }
    }
    toRawContent() {
        let obj = {
            'TD': this.Text.toRawContent()
        };
        if (this.Link) {
            obj['L'] = this.Link.toRawContent();
        }
        if (this.Thumbnail) {
            obj['TH'] = this.Thumbnail.toRawContent();
        }
        if (this.Background) {
            obj['BG'] = this.Background.toRawContent();
        }
        return obj;
    }
}
exports.CarouselCover = CarouselCover;
class CustomCarouselContent extends CustomContent {
    constructor(CardType = CustomType.FEED, ContentList = [], ContentHead, ContentTail) {
        super();
        this.CardType = CardType;
        this.ContentList = ContentList;
        this.ContentHead = ContentHead;
        this.ContentTail = ContentTail;
    }
    readRawContent(rawData) {
        if (rawData['CTP'])
            this.CardType = rawData['CTP'];
        if (rawData['CIL']) {
            this.ContentList = [];
            for (let rawContent of rawData['CIL']) {
                this.ContentList.push(CustomContent.fromRawContent(rawContent, this.CardType));
            }
        }
        if (rawData['CHD']) {
            this.ContentHead = new CarouselCover();
            this.ContentHead.readRawContent(rawData['CHD']);
        }
        if (rawData['CTA']) {
            this.ContentTail = new CarouselCover();
            this.ContentTail.readRawContent(rawData['CTA']);
        }
    }
    toRawContent() {
        let obj = {
            'CTP': this.CardType
        };
        let list = [];
        for (let content of this.ContentList) {
            list.push(content.toRawContent());
        }
        obj['CIL'] = list;
        if (this.ContentHead) {
            obj['CHD'] = this.ContentHead.toRawContent();
        }
        if (this.ContentTail) {
            obj['CTA'] = this.ContentTail.toRawContent();
        }
        return obj;
    }
}
exports.CustomCarouselContent = CustomCarouselContent;
class CustomInfo {
    constructor(Message = '', Type = CustomType.FEED, ServiceId = '', ProviderId = '', AndroidVersion = '', IosVersion = '', WinVersion = '', MacVersion = '', ServiceNickname, ServiceIcon, ServiceLink, Link, Secure, Fw, Ref = '', Ad) {
        this.Message = Message;
        this.Type = Type;
        this.ServiceId = ServiceId;
        this.ProviderId = ProviderId;
        this.AndroidVersion = AndroidVersion;
        this.IosVersion = IosVersion;
        this.WinVersion = WinVersion;
        this.MacVersion = MacVersion;
        this.ServiceNickname = ServiceNickname;
        this.ServiceIcon = ServiceIcon;
        this.ServiceLink = ServiceLink;
        this.Link = Link;
        this.Secure = Secure;
        this.Fw = Fw;
        this.Ref = Ref;
        this.Ad = Ad;
    }
    readRawContent(rawData) {
        this.Message = rawData['ME'];
        this.Type = rawData['TP'];
        this.ServiceId = rawData['SID'];
        this.ProviderId = rawData['DID'];
        this.AndroidVersion = rawData['VA'];
        this.IosVersion = rawData['VI'];
        this.WinVersion = rawData['VW'];
        this.MacVersion = rawData['VM'];
        this.ServiceNickname = rawData['SNM'];
        this.ServiceIcon = rawData['SIC'];
        this.Ad = rawData['AD'];
        this.Secure = rawData['LOCK'];
        if (rawData['L']) {
            this.Link = new URLFragment();
            this.Link.readRawContent(rawData['L']);
        }
        if (rawData['SL']) {
            this.ServiceLink = new URLFragment();
            this.ServiceLink.readRawContent(rawData['SL']);
        }
    }
    toRawContent() {
        let obj = {
            'ME': this.Message,
            'TP': this.Type,
            'SID': this.ServiceId,
            'DID': this.ProviderId,
            'VA': this.AndroidVersion,
            'VI': this.IosVersion,
            'VW': this.WinVersion,
            'VM': this.MacVersion
        };
        if (this.ServiceNickname)
            obj['SNM'] = this.ServiceNickname;
        if (this.ServiceIcon)
            obj['SIC'] = this.ServiceIcon;
        if (typeof (this.Secure) !== 'undefined')
            obj['LOCK'] = this.Secure;
        if (typeof (this.Fw) !== 'undefined')
            obj['FW'] = this.Fw;
        if (typeof (this.Ad) !== 'undefined')
            obj['AD'] = this.Ad;
        if (this.Ref !== '')
            obj['RF'] = this.Ref;
        if (this.Link)
            obj['L'] = this.Link.toRawContent();
        if (this.ServiceLink)
            obj['SL'] = this.ServiceLink.toRawContent();
        return obj;
    }
}
exports.CustomInfo = CustomInfo;
class KakaoLinkInfo {
    constructor(AppId = '', TemplateId, LinkVersion, AppKey, AppVersion) {
        this.AppId = AppId;
        this.TemplateId = TemplateId;
        this.LinkVersion = LinkVersion;
        this.AppKey = AppKey;
        this.AppVersion = AppVersion;
    }
    readRawContent(rawData) {
        this.AppId = rawData['ai'];
        this.TemplateId = rawData['ti'];
        this.LinkVersion = rawData['lv'];
        this.AppKey = rawData['ak'];
        this.AppVersion = rawData['av'];
    }
    toRawContent() {
        let obj = {
            'ai': this.AppId
        };
        if (this.TemplateId)
            obj['ti'] = this.TemplateId;
        if (this.LinkVersion)
            obj['lv'] = this.LinkVersion;
        if (this.AppKey)
            obj['ak'] = this.AppKey;
        if (this.AppVersion)
            obj['av'] = this.AppVersion;
        return obj;
    }
}
exports.KakaoLinkInfo = KakaoLinkInfo;
class CustomAttachment {
    constructor(Info = new CustomInfo(), Content, LinkInfo) {
        this.Info = Info;
        this.Content = Content;
        this.LinkInfo = LinkInfo;
    }
    readAttachment(rawJson) {
        if (rawJson['P'])
            this.Info.readRawContent(rawJson['P']);
        if (rawJson['C'])
            this.Content = CustomContent.fromRawContent(rawJson['C'], this.Info.Type);
        if (rawJson['K']) {
            this.LinkInfo = new KakaoLinkInfo();
            this.LinkInfo.readRawContent(rawJson['K']);
        }
    }
    toJsonAttachment() {
        let obj = {
            'P': this.Info.toRawContent()
        };
        if (this.Content)
            obj['C'] = this.Content.toRawContent();
        if (this.LinkInfo) {
            obj['K'] = this.LinkInfo.toRawContent();
        }
        return obj;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Custom;
    }
}
exports.CustomAttachment = CustomAttachment;
//# sourceMappingURL=custom-attachment.js.map