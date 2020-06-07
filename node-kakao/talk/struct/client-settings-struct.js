"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSettingsStruct = void 0;
const json_util_1 = require("../../util/json-util");
const bson_1 = require("bson");
class ClientSettingsStruct {
    constructor(Status = 0, AllowPay = false, AllowStory = false, AllowStoryPost = false, BackgroundImageURL = '', OriginalBackgroundImageURL = '', ProfileImageURL = '', FullProfileImageURL = '', OriginalProfileImageURL = '', StatusMessage = '', StoryURL = '', Suspended = false, UserId = bson_1.Long.ZERO) {
        this.Status = Status;
        this.AllowPay = AllowPay;
        this.AllowStory = AllowStory;
        this.AllowStoryPost = AllowStoryPost;
        this.BackgroundImageURL = BackgroundImageURL;
        this.OriginalBackgroundImageURL = OriginalBackgroundImageURL;
        this.ProfileImageURL = ProfileImageURL;
        this.FullProfileImageURL = FullProfileImageURL;
        this.OriginalProfileImageURL = OriginalProfileImageURL;
        this.StatusMessage = StatusMessage;
        this.StoryURL = StoryURL;
        this.Suspended = Suspended;
        this.UserId = UserId;
    }
    fromJson(rawData) {
        this.Status = rawData['status'];
        this.AllowPay = rawData['allowPay'];
        this.AllowStory = rawData['allowStory'];
        this.AllowStoryPost = rawData['allowStoryPost'];
        this.BackgroundImageURL = rawData['backgroundImageUrl'];
        this.OriginalBackgroundImageURL = rawData['originalBackgroundImageUrl'];
        this.ProfileImageURL = rawData['profileImageUrl'];
        this.FullProfileImageURL = rawData['fullProfileImageUrl'];
        this.OriginalProfileImageURL = rawData['originalProfileImageUrl'];
        this.StatusMessage = rawData['statusMessage'];
        this.StoryURL = rawData['storyWebUrl'];
        this.Suspended = rawData['suspended'];
        this.UserId = json_util_1.JsonUtil.readLong(rawData['userId']);
    }
    toJson() {
        return {
            'status': this.Status,
            'allowPay': this.AllowPay,
            'allowStory': this.AllowStory,
            'allowStoryPost': this.AllowStoryPost,
            'backgroundImageUrl': this.BackgroundImageURL,
            'originalBackgroundImageUrl': this.OriginalBackgroundImageURL,
            'profileImageUrl': this.ProfileImageURL,
            'fullProfileImageUrl': this.FullProfileImageURL,
            'originalProfileImageUrl': this.OriginalProfileImageURL,
            'statusMessage': this.StatusMessage,
            'storyWebUrl': this.StoryURL,
            'suspended': this.Suspended,
            'userId': this.UserId
        };
    }
}
exports.ClientSettingsStruct = ClientSettingsStruct;
//# sourceMappingURL=client-settings-struct.js.map