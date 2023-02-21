import { Descriptor } from "pip-services3-commons-nodex";
import { Factory } from "pip-services3-components-nodex";
import MessagingController from "../../controllers/messaging.controller";
import MessagingDbPersistence from "../mongo/messaging-db-persistence.service";
import { ConversationRestService } from "../rest/conversations.service";
import MessagingRestService from "../rest/messaging.service";
import { UsersRestService } from "../rest/users.service";

export default class MessagingServiceFactory extends Factory {
    constructor() {
        super();

        this.registerAsType(
            new Descriptor('messaging', 'controller', 'default', '*', '1.0'),
            MessagingController
        );

        this.registerAsType(
            new Descriptor('messaging', 'service', 'http', '*', '1.0'),
            MessagingRestService
        );

        this.registerAsType(
            new Descriptor('conversations', 'service', 'http', '*', '1.0'),
            ConversationRestService
        );

        this.registerAsType(
            new Descriptor('users', 'service', 'http', '*', '1.0'),
            UsersRestService
        );

        this.registerAsType(
            new Descriptor('messaging', 'persistence', 'mongodb', '*', '1.0'),
            MessagingDbPersistence
        );
    }
}