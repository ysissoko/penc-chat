import { Descriptor } from "pip-services3-commons-nodex";
import { Factory } from "pip-services3-components-nodex";
import MessagingController from "../../controllers/messaging.controller";
import MessagingDbPersistence from "../mongo/messaging-db-persistence.service";
import MessagingRestService from "../rest/messaging.service";

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
            new Descriptor('messaging', 'persistence', 'mongodb', '*', '1.0'),
            MessagingDbPersistence
        );
    }
}
