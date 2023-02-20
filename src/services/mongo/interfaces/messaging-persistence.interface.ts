import { DataPage, FilterParams, PagingParams } from "pip-services3-commons-nodex";
import { Conversation } from "../models/conversation.model";

export default interface IMessagingPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<Conversation>>;

    getOneById(correlationId: string, id: string): Promise<Conversation>;

    create(correlationId: string, item: Conversation): Promise<Conversation>;

    update(correlationId: string, item: Conversation): Promise<Conversation>;

    deleteById(correlationId: string, id: string): Promise<Conversation>;
}