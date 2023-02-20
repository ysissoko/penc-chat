
/**
 * Data model identifiable representing a message
 */
export interface IMessage {
    date: Date;
    senderUid: string;
    text: string;
    offerId: string;
}