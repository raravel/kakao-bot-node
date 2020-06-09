import { ChatType } from "../chat-type";
import { ChatAttachment, ChatContent } from "../attachment/chat-attachment";
export interface MessageTemplate {
    readonly Valid: boolean;
    getMessageType(): ChatType;
    getPacketText(): string;
    getPacketExtra(): string;
}
export declare class AttachmentTemplate implements MessageTemplate {
    private attachment;
    private packetText;
    private textExtra;
    constructor(attachment: ChatAttachment, ...textFormat: (string | ChatContent)[]);
    get Attachment(): ChatAttachment;
    set Attachment(attachment: ChatAttachment);
    get Text(): string;
    setText(...textFormat: (string | ChatContent)[]): void;
    get Valid(): boolean;
    getMessageType(): ChatType;
    getPacketText(): string;
    getPacketExtra(): any;
}
