"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharpVideoContent = exports.SharpRankContent = exports.SharpMovieContent = exports.SharpMediaContent = exports.SharpSimpleContent = exports.SharpWeatherContent = exports.SharpWeatherFragment = exports.WeatherIcon = exports.SharpImageContent = exports.SharpButtonListContent = exports.SharpAttachment = exports.SharpButtonFragment = exports.SharpTextFragment = exports.SharpImageFragment = exports.SharpFragment = exports.SharpContent = exports.SharpBaseContent = exports.SharpContentType = void 0;
const chat_type_1 = require("../chat-type");
var SharpContentType;
(function (SharpContentType) {
    SharpContentType["NONE"] = "";
    SharpContentType["LIST"] = "list";
    SharpContentType["IMAGE"] = "image";
    SharpContentType["VIDEO_CLIP"] = "vclip";
    SharpContentType["WEATHER"] = "weather";
    SharpContentType["MOVIE"] = "movie";
    SharpContentType["MEDIA"] = "media";
    SharpContentType["RANK"] = "rank";
    SharpContentType["SIMPLE"] = "simple";
})(SharpContentType = exports.SharpContentType || (exports.SharpContentType = {}));
class SharpBaseContent {
}
exports.SharpBaseContent = SharpBaseContent;
class SharpContent extends SharpBaseContent {
}
exports.SharpContent = SharpContent;
class SharpFragment extends SharpBaseContent {
}
exports.SharpFragment = SharpFragment;
class SharpImageFragment extends SharpFragment {
    constructor(ImageURL = '', ImageWidth = -1, ImageHeight = -1) {
        super();
        this.ImageURL = ImageURL;
        this.ImageWidth = ImageWidth;
        this.ImageHeight = ImageHeight;
    }
    readRawContent(rawData) {
        this.ImageURL = rawData['I'] || '';
        this.ImageWidth = rawData['W'] || -1;
        this.ImageHeight = rawData['H'] || -1;
    }
    toRawContent() {
        let obj = {
            'I': this.ImageURL
        };
        if (this.ImageWidth !== -1) {
            obj['W'] = this.ImageWidth;
        }
        if (this.ImageHeight !== -1) {
            obj['H'] = this.ImageHeight;
        }
        return obj;
    }
}
exports.SharpImageFragment = SharpImageFragment;
class SharpTextFragment extends SharpFragment {
    constructor(Text = '', Description = '') {
        super();
        this.Text = Text;
        this.Description = Description;
    }
    readRawContent(rawData) {
        this.Text = rawData['T'] || '';
        this.Description = rawData['DE'] || '';
    }
    toRawContent() {
        let obj = {
            'T': this.Text
        };
        if (this.Description !== '') {
            obj['DE'] = this.Description;
        }
        return obj;
    }
}
exports.SharpTextFragment = SharpTextFragment;
class SharpButtonFragment extends SharpFragment {
    constructor(Text = '', RedirectLink = '', Icon = '') {
        super();
        this.Text = Text;
        this.RedirectLink = RedirectLink;
        this.Icon = Icon;
    }
    readRawContent(rawData) {
        this.Text = rawData['T'] || '';
        this.RedirectLink = rawData['L'] || '';
        this.Icon = rawData['TP'] || '';
    }
    toRawContent() {
        let obj = {
            'T': this.Text
        };
        if (this.RedirectLink !== '') {
            obj['L'] = this.RedirectLink;
        }
        if (this.Icon !== '') {
            obj['TP'] = this.Icon;
        }
        return obj;
    }
}
exports.SharpButtonFragment = SharpButtonFragment;
class SharpAttachment {
    constructor(Question = '', RedirectURL = '', ContentType = SharpContentType.NONE, ContentList = [], MainImage, Footer) {
        this.Question = Question;
        this.RedirectURL = RedirectURL;
        this.ContentType = ContentType;
        this.ContentList = ContentList;
        this.MainImage = MainImage;
        this.Footer = Footer;
    }
    get RequiredMessageType() {
        return chat_type_1.ChatType.Search;
    }
    readAttachment(rawJson) {
        this.Question = rawJson['Q'];
        this.ContentType = rawJson['V'] || SharpContentType.NONE;
        if (rawJson['I']) {
            this.MainImage = new SharpImageFragment();
            this.MainImage.readRawContent(rawJson);
        }
        this.RedirectURL = rawJson['L'];
        this.ContentList = [];
        if (rawJson['R']) {
            let list = rawJson['R'];
            for (let rawContent of list) {
                let content;
                switch (this.ContentType) {
                    case SharpContentType.VIDEO_CLIP:
                        content = new SharpVideoContent();
                        break;
                    case SharpContentType.MEDIA:
                        content = new SharpMediaContent();
                        break;
                    case SharpContentType.LIST:
                    case SharpContentType.IMAGE:
                        content = new SharpImageContent();
                        break;
                    case SharpContentType.MOVIE:
                        content = new SharpMovieContent();
                        break;
                    case SharpContentType.RANK:
                        content = new SharpRankContent();
                        break;
                    case SharpContentType.WEATHER:
                        content = new SharpWeatherContent();
                        break;
                    case SharpContentType.SIMPLE:
                    default:
                        content = new SharpSimpleContent();
                        break;
                }
                content.readRawContent(rawContent);
                this.ContentList.push(content);
            }
        }
        if (rawJson['F']) {
            this.Footer = new SharpButtonListContent();
            this.Footer.readRawContent(rawJson['F']);
        }
    }
    toJsonAttachment() {
        let obj = {
            'Q': this.Question,
            'V': this.ContentType,
            'L': this.RedirectURL
        };
        if (this.MainImage) {
            Object.assign(obj, this.MainImage.toRawContent());
        }
        if (this.ContentList.length > 0) {
            let rawList = [];
            for (let content of this.ContentList) {
                rawList.push(content.toRawContent());
            }
            obj['R'] = rawList;
        }
        if (this.Footer) {
            obj['F'] = this.Footer.toRawContent();
        }
        return obj;
    }
}
exports.SharpAttachment = SharpAttachment;
class SharpButtonListContent extends SharpContent {
    constructor(ButtonList) {
        super();
        this.ButtonList = ButtonList;
    }
    readRawContent(rawData) {
        if (rawData['BU']) {
            this.ButtonList = [];
            for (let rawBtn of rawData['BU']) {
                let btn = new SharpButtonFragment();
                btn.readRawContent(rawBtn);
                this.ButtonList.push(btn);
            }
        }
    }
    toRawContent() {
        let list = [];
        if (this.ButtonList) {
            for (let btn of this.ButtonList) {
                list.push(btn.toRawContent());
            }
        }
        else {
            return {};
        }
        return {
            'BU': list
        };
    }
}
exports.SharpButtonListContent = SharpButtonListContent;
class SharpImageContent extends SharpContent {
    constructor(RedirectURL = '', Text, InfoText = '', Image) {
        super();
        this.RedirectURL = RedirectURL;
        this.Text = Text;
        this.InfoText = InfoText;
        this.Image = Image;
    }
    readRawContent(rawData) {
        if (rawData['T']) {
            this.Text = new SharpTextFragment();
            this.Text.readRawContent(rawData);
        }
        this.InfoText = rawData['D'];
        this.RedirectURL = rawData['L'];
        if (rawData['I']) {
            this.Image = new SharpImageFragment();
            this.Image.readRawContent(rawData);
        }
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL
        };
        if (this.InfoText !== '') {
            obj['D'] = this.InfoText;
        }
        if (this.Text) {
            Object.assign(obj, this.Text.toRawContent());
        }
        if (this.Image) {
            Object.assign(obj, this.Image.toRawContent());
        }
        return obj;
    }
}
exports.SharpImageContent = SharpImageContent;
var WeatherIcon;
(function (WeatherIcon) {
    WeatherIcon["CLEAR"] = "01";
    WeatherIcon["SUN_SILGHTLY_CLOUDY"] = "02";
    WeatherIcon["SUN_CLOUDY"] = "03";
    WeatherIcon["CLOUDY"] = "04";
    WeatherIcon["SUN_WITH_CLOUD"] = "05";
    WeatherIcon["SUN_CLOUDY_2"] = "06";
    WeatherIcon["RAIN"] = "07";
    WeatherIcon["CLOUD_RAIN"] = "08";
    WeatherIcon["RAIN_UMBRELLA"] = "09";
    WeatherIcon["LITTLE_RAIN"] = "10";
    WeatherIcon["SNOW"] = "11";
    WeatherIcon["CLOUD_SNOW"] = "12";
    WeatherIcon["CLOUD_SUN_SNOW"] = "13";
    WeatherIcon["SNOW_RAIN"] = "14";
    WeatherIcon["CLOUDY_SNOW_RAIN"] = "15";
    WeatherIcon["LITTLE_SNOW"] = "16";
    WeatherIcon["LIGHTNING"] = "17";
    WeatherIcon["FOG"] = "18";
    WeatherIcon["HAIL"] = "19";
    WeatherIcon["NIGHT_CLEAR"] = "20";
    WeatherIcon["NIGHT_SILGHTLY_CLOUDY"] = "21";
    WeatherIcon["NIGHT_MOON_CLOUDY"] = "22";
    WeatherIcon["MOON_WITH_CLOUD"] = "23";
    WeatherIcon["NIGHT_CLOUDY_2"] = "24";
    WeatherIcon["NIGHT_LITTLE_RAIN"] = "25";
    WeatherIcon["CLOUD_MOON_SNOW"] = "26";
    WeatherIcon["NIGHT_LITTLE_RAIN_2"] = "27";
    WeatherIcon["NIGHT_CLOUDY"] = "28";
    WeatherIcon["NIGHT_RAIN"] = "29";
    WeatherIcon["NIGHT_CLOUD_RAIN"] = "30";
    WeatherIcon["NIGHT_RAIN_UMBRELLA"] = "31";
    WeatherIcon["NIGHT_SNOW"] = "32";
    WeatherIcon["NIGHT_CLOUD_SNOW"] = "33";
    WeatherIcon["NIGHT_SNOW_RAIN"] = "34";
    WeatherIcon["NIGHT_CLOUDY_SNOW_RAIN"] = "35";
    WeatherIcon["NIGHT_LIGHTNING"] = "36";
    WeatherIcon["NIGHT_FOG"] = "37";
    WeatherIcon["NIGHT_HAIL"] = "38";
})(WeatherIcon = exports.WeatherIcon || (exports.WeatherIcon = {}));
class SharpWeatherFragment extends SharpFragment {
    constructor(Icon = WeatherIcon.CLEAR, Text = new SharpTextFragment(), Temperature = '') {
        super();
        this.Icon = Icon;
        this.Text = Text;
        this.Temperature = Temperature;
    }
    readRawContent(rawData) {
        if (rawData['T']) {
            this.Text.readRawContent(rawData);
        }
        this.Icon = rawData['IC'];
        this.Temperature = rawData['TE'];
    }
    toRawContent() {
        let obj = {
            'IC': this.Icon
        };
        if (this.Temperature !== '') {
            obj['TE'] = this.Temperature;
        }
        if (this.Text) {
            Object.assign(obj, this.Text.toRawContent());
        }
        return obj;
    }
}
exports.SharpWeatherFragment = SharpWeatherFragment;
class SharpWeatherContent extends SharpContent {
    constructor(RedirectURL = '', InfoText = '', Place = '', LastUpdate = '', MainWeather = [], SubWeather = []) {
        super();
        this.RedirectURL = RedirectURL;
        this.InfoText = InfoText;
        this.Place = Place;
        this.LastUpdate = LastUpdate;
        this.MainWeather = MainWeather;
        this.SubWeather = SubWeather;
    }
    readRawContent(rawData) {
        this.InfoText = rawData['D'];
        this.RedirectURL = rawData['L'];
        this.Place = rawData['PL'];
        this.LastUpdate = rawData['TM'];
        if (rawData['MA']) {
            this.MainWeather = [];
            for (let raw of rawData['MA']) {
                let fragment = new SharpWeatherFragment();
                fragment.readRawContent(raw);
                this.MainWeather.push(fragment);
            }
        }
        if (rawData['SU']) {
            this.SubWeather = [];
            for (let raw of rawData['SU']) {
                let fragment = new SharpWeatherFragment();
                fragment.readRawContent(raw);
                this.SubWeather.push(fragment);
            }
        }
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL
        };
        if (this.Place !== '') {
            obj['PL'] = this.Place;
        }
        if (this.LastUpdate !== '') {
            obj['TM'] = this.LastUpdate;
        }
        if (this.InfoText !== '') {
            obj['D'] = this.InfoText;
        }
        if (this.MainWeather.length > 0) {
            let list = [];
            for (let weather of this.MainWeather) {
                list.push(weather.toRawContent());
            }
            obj['MA'] = list;
        }
        if (this.SubWeather.length > 0) {
            let list = [];
            for (let weather of this.SubWeather) {
                list.push(weather.toRawContent());
            }
            obj['SU'] = list;
        }
        return obj;
    }
}
exports.SharpWeatherContent = SharpWeatherContent;
class SharpSimpleContent extends SharpFragment {
    constructor(RedirectURL = '', Text = '', InfoText = '') {
        super();
        this.RedirectURL = RedirectURL;
        this.Text = Text;
        this.InfoText = InfoText;
    }
    readRawContent(rawData) {
        this.Text = rawData['T'];
        this.InfoText = rawData['D'];
        this.RedirectURL = rawData['L'];
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL
        };
        if (this.InfoText !== '') {
            obj['D'] = this.InfoText;
        }
        if (this.Text !== '') {
            obj['T'] = this.Text;
        }
        return obj;
    }
}
exports.SharpSimpleContent = SharpSimpleContent;
class SharpMediaContent extends SharpContent {
    constructor(RedirectURL = '', Text, InfoText = '', ExtraInfoList = [], Image) {
        super();
        this.RedirectURL = RedirectURL;
        this.Text = Text;
        this.InfoText = InfoText;
        this.ExtraInfoList = ExtraInfoList;
        this.Image = Image;
    }
    readRawContent(rawData) {
        if (rawData['T']) {
            this.Text = new SharpTextFragment();
            this.Text.readRawContent(rawData);
        }
        if (rawData['DL']) {
            this.ExtraInfoList = [];
            for (let rawText of rawData['DL']) {
                if (!rawText)
                    continue;
                let text = new SharpTextFragment();
                text.readRawContent(rawText);
                this.ExtraInfoList.push(text);
            }
        }
        this.InfoText = rawData['D'];
        this.RedirectURL = rawData['L'];
        if (rawData['I']) {
            this.Image = new SharpImageFragment();
            this.Image.readRawContent(rawData);
        }
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL
        };
        if (this.InfoText !== '') {
            obj['D'] = this.InfoText;
        }
        if (this.Text) {
            Object.assign(obj, this.Text.toRawContent());
        }
        if (this.Image) {
            Object.assign(obj, this.Image.toRawContent());
        }
        if (this.ExtraInfoList.length > 0) {
            let list = [];
            for (let text of this.ExtraInfoList) {
                list.push(text.toRawContent());
            }
            obj['DL'] = list;
        }
        return obj;
    }
}
exports.SharpMediaContent = SharpMediaContent;
class SharpMovieContent extends SharpContent {
    constructor(RedirectURL = '', Text, InfoText = '', StarRate = '', ExtraInfoList = [], ImageList = []) {
        super();
        this.RedirectURL = RedirectURL;
        this.Text = Text;
        this.InfoText = InfoText;
        this.StarRate = StarRate;
        this.ExtraInfoList = ExtraInfoList;
        this.ImageList = ImageList;
    }
    readRawContent(rawData) {
        if (rawData['T']) {
            this.Text = new SharpTextFragment();
            this.Text.readRawContent(rawData);
        }
        this.InfoText = rawData['D'];
        this.RedirectURL = rawData['L'];
        if (rawData['IL']) {
            this.ImageList = [];
            for (let rawImage of rawData['IL']) {
                if (!rawImage)
                    continue;
                let img = new SharpImageFragment();
                img.readRawContent(rawImage);
                this.ImageList.push(img);
            }
        }
        if (rawData['DL']) {
            this.ExtraInfoList = [];
            for (let rawText of rawData['DL']) {
                if (!rawText)
                    continue;
                let text = new SharpTextFragment();
                text.readRawContent(rawText);
                this.ExtraInfoList.push(text);
            }
        }
        this.StarRate = rawData['ST'];
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL
        };
        if (this.InfoText !== '') {
            obj['D'] = this.InfoText;
        }
        if (this.Text) {
            Object.assign(obj, this.Text.toRawContent());
        }
        if (this.ImageList.length > 0) {
            let list = [];
            for (let image of this.ImageList) {
                list.push(image.toRawContent());
            }
            obj['IL'] = list;
        }
        if (this.ExtraInfoList.length > 0) {
            let list = [];
            for (let text of this.ExtraInfoList) {
                list.push(text.toRawContent());
            }
            obj['DL'] = list;
        }
        obj['ST'] = this.StarRate;
        return obj;
    }
}
exports.SharpMovieContent = SharpMovieContent;
class SharpRankContent extends SharpContent {
    constructor(RedirectURL = '', Text, StarRate = '', Rank = '', Image) {
        super();
        this.RedirectURL = RedirectURL;
        this.Text = Text;
        this.StarRate = StarRate;
        this.Rank = Rank;
        this.Image = Image;
    }
    readRawContent(rawData) {
        if (rawData['T']) {
            this.Text = new SharpTextFragment();
            this.Text.readRawContent(rawData);
        }
        this.RedirectURL = rawData['L'];
        if (rawData['I']) {
            this.Image = new SharpImageFragment();
            this.Image.readRawContent(rawData);
        }
        if (rawData['RA']) {
            this.Rank = rawData['RA'];
        }
        this.StarRate = rawData['ST'];
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL
        };
        if (this.Text) {
            Object.assign(obj, this.Text.toRawContent());
        }
        if (this.Image) {
            Object.assign(obj, this.Image.toRawContent());
        }
        if (this.Rank !== '') {
            obj['RA'] = this.Rank;
        }
        obj['ST'] = this.StarRate;
        return obj;
    }
}
exports.SharpRankContent = SharpRankContent;
class SharpVideoContent extends SharpContent {
    constructor(RedirectURL = '', Text, InfoText = '', PlayTime = 0, Image) {
        super();
        this.RedirectURL = RedirectURL;
        this.Text = Text;
        this.InfoText = InfoText;
        this.PlayTime = PlayTime;
        this.Image = Image;
    }
    readRawContent(rawData) {
        if (rawData['T']) {
            this.Text = new SharpTextFragment();
            this.Text.readRawContent(rawData);
        }
        this.InfoText = rawData['D'];
        this.PlayTime = rawData['PT'] || 0;
        if (rawData['I']) {
            this.Image = new SharpImageFragment();
            this.Image.readRawContent(rawData);
        }
        this.RedirectURL = rawData['L'];
    }
    toRawContent() {
        let obj = {
            'L': this.RedirectURL,
            'PT': this.PlayTime
        };
        if (this.InfoText !== '') {
            obj['D'] = this.InfoText;
        }
        if (this.Text) {
            Object.assign(obj, this.Text.toRawContent());
        }
        if (this.Image) {
            Object.assign(obj, this.Image.toRawContent());
        }
        return obj;
    }
}
exports.SharpVideoContent = SharpVideoContent;
//# sourceMappingURL=sharp-attachment.js.map