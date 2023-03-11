import { IIdentifiable } from 'pip-services3-commons-nodex';
import { IMessage } from './message.model';
import { IUser } from './user.model';

/**
 * Data model identifiable representing a conversation
 */
export class Conversation implements IIdentifiable<string> {
    id!: string;
    date: Date = new Date;
    participants: IUser[] = [];
    messages: IMessage[] = [];
    product!: {
        id: number,
        category: { id: number, name: string },
        price: number,
        name: string,
        description: string,
        photos: string[],

    };
    shop!: { id: number, name: string }
}
