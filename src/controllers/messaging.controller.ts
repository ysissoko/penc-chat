import correlator from 'correlation-id';
import { BadRequestException, Descriptor, FilterParams, IReferenceable, IReferences, NotFoundException, PagingParams } from "pip-services3-commons-nodex";
import IMessagingPersistence from "../services/mongo/interfaces/messaging-persistence.interface";
import { Conversation } from "../services/mongo/models/conversation.model";
import { IMessage } from "../services/mongo/models/message.model";
import { IUser } from '../services/mongo/models/user.model';

export default class MessagingController implements IReferenceable {
    _persistence!: IMessagingPersistence;

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<IMessagingPersistence>(
            new Descriptor("messaging", "persistence", "*", "*", "1.0")
        );
    }

    public async addMessageToConv(id: string, message: IMessage) {
        const conv: Conversation = await this.findConv(id);

        if (!conv.participants.find((user: IUser) => user.uid === message.senderUid))
            throw new BadRequestException(correlator.getId() ?? "", "CONV_BAD_SENDER_ID", 'the sender is not in the conversation')

        message.date = new Date;

        conv.messages.push(message);
        return await this._persistence.update("", conv);
    }

    public async createConv(conv: Conversation) {
        conv.date = new Date;
        conv.messages[0].date = new Date;

        return await this._persistence.create(correlator.getId() ?? "", conv);
    }

    public async joinConv(id: string, participant: IUser) {
        const conv: Conversation = await this.findConv(id);
        conv.participants.push(participant);

        return await this._persistence.update(correlator.getId() ?? "", conv);
    }

    public async getUserConversations(uid: string) {
        return await this._persistence.getPageByFilter(correlator.getId() ?? "", FilterParams.fromTuples("uid", uid), new PagingParams(0, 100))
    }

    private async findConv(convId: string) {
        let conv: Conversation = await this._persistence.getOneById(correlator.getId() ?? "", convId);

        if (!conv)
            throw new NotFoundException(correlator.getId() ?? "", "CONV_NOT_FOUND", 'conversation does not exist');

        return conv;
    }
}
