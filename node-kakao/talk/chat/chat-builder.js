"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBuilder = void 0;
const chat_attachment_1 = require("./attachment/chat-attachment");
var ChatBuilder;
(function (ChatBuilder) {
    function buildMessage(...textFormat) {
        let text = '';
        let mentionPrefix = '@';
        let mentionMap = new Map();
        let extra = {};
        let mentionCount = 1;
        let len = textFormat.length;
        for (let i = 0; i < len; i++) {
            let fragment = textFormat[i];
            let type = typeof (fragment);
            if (type === 'string') {
                text += fragment;
            }
            else if (type === 'object') {
                let content = fragment;
                switch (content.ContentType) {
                    case 'mention': {
                        let mentionContent = content;
                        let mentionContentList = mentionMap.get(mentionContent.User.Id.toString());
                        let nickname = mentionContent.User.Nickname || 'unknown';
                        if (!mentionContentList) {
                            mentionContentList = new chat_attachment_1.MentionContentList(mentionContent.User.Id, nickname.length);
                            mentionMap.set(mentionContent.User.Id.toString(), mentionContentList);
                        }
                        mentionContentList.IndexList.push(mentionCount++);
                        text += `${mentionPrefix}${nickname}`;
                        break;
                    }
                    default: throw new Error(`Unknown ChatContent ${fragment} at format index:${i}`);
                }
            }
            else {
                throw new Error(`Unknown type ${typeof (fragment)} at format index:${i}`);
            }
        }
        let mentionMapValues = mentionMap.values();
        let mentions = [];
        for (let mentionList of mentionMapValues) {
            mentions.push(mentionList.toRawContent());
        }
        if (mentions.length > 0) {
            extra['mentions'] = mentions;
        }
        return {
            'text': text,
            'extra': extra
        };
    }
    ChatBuilder.buildMessage = buildMessage;
})(ChatBuilder = exports.ChatBuilder || (exports.ChatBuilder = {}));
//# sourceMappingURL=chat-builder.js.map