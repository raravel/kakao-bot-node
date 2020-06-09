import { ChatContent } from "./attachment/chat-attachment";
export declare namespace ChatBuilder {
    type BuiltMessage = {
        'text': string;
        'extra': any;
    };
    function buildMessage(...textFormat: (string | ChatContent)[]): BuiltMessage;
}
