import { DataPage, FilterParams, PagingParams } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import IMessagingPersistence from './interfaces/messaging-persistence.interface';
import { Conversation } from './models/conversation.model';

export default class MessagingDbPersistence extends IdentifiableMongoDbPersistence<Conversation, string> implements IMessagingPersistence {
    public constructor() {
        super("conversations");
    }
    getByFilter(correlationId: string, filter: FilterParams): Promise<Conversation[]> {
        throw new Error('Method not implemented.');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id: string = filter.getAsNullableString('id');
        if (id)
            criteria.push({ _id: id });

        let tempIds: string = filter.getAsNullableString("ids");
        if (tempIds) {
            let ids = tempIds.split(",");
            criteria.push({ _id: { $in: ids } });
        }

        let uid: string = filter.getAsNullableString("uid");
        if (uid)
            criteria.push({ participantsUid: uid });

        let dateInf: Date = filter.getAsNullableDateTime("dateInf");
        let dateSup: Date = filter.getAsNullableDateTime("dateSup");

        if (dateInf) {
            criteria.push({ date: { $gte: dateInf } });
        }

        if (dateSup) {
            criteria.push({ date: { $lte: dateSup } });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Conversation>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "_id", null);
    }
}
