import { Descriptor, FilterParams, IReferenceable, IReferences, PagingParams } from "pip-services3-commons-nodex";
import IMessagingPersistence from "../services/mongo/interfaces/messaging-persistence.interface";
import { Conversation } from "../services/mongo/models/conversation.model";
import { IMessage } from "../services/mongo/models/message.model";

export default class MessagingController implements IReferenceable {
    _persistence!: IMessagingPersistence;

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<IMessagingPersistence>(
            new Descriptor("messaging", "persistence", "*", "*", "1.0")
        );
    }

    public async addMessageToConv(id: string, message: IMessage) {
        let conv: Conversation = await this._persistence.getOneById("", id);

        if (!conv) 
            throw new Error('conversation does not exist')

        conv.messages.push(message);
        return await this._persistence.update("", conv);
    }

    public async createConv(conv: Conversation) {
        conv.date = new Date;
        return await this._persistence.create("", conv);
    }

    public async getUserConversations(uid: string) {
       return await this._persistence.getPageByFilter("", FilterParams.fromTuples("uid", uid), new PagingParams(0, 100))
    }
}