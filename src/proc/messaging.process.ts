import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultMongoDbFactory } from 'pip-services3-mongodb-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import MessagingServiceFactory from '../services/factories/messaging-service.factory';

export default class MessagingProcess extends ProcessContainer {
    constructor() {
        super('messaging', 'Messaging microservices');
        this._configPath = 'config.yaml';

        this.addFactory(new MessagingServiceFactory());
        this.addFactory(new DefaultRpcFactory());
        this.addFactory(new DefaultMongoDbFactory());
    }
}