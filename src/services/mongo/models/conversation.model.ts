import { IIdentifiable } from 'pip-services3-commons-nodex';
import { IMessage } from './message.model';

/**
 * Data model identifiable representing a conversation
 */
export class Conversation implements IIdentifiable<string> {
    id!: string;
    date: Date = new Date;
    participantsUid: string[] = [];
    messages: IMessage[] = [];
}
