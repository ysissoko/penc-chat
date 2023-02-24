import { ConfigParams, IReferences } from "pip-services3-commons-nodex";
import { RestService } from "pip-services3-rpc-nodex";
import MessagingRestOperations from "./messaging-operations.service";

export default class MessagingRestServiceV1 extends RestService {
    private _messagingOperations: MessagingRestOperations = new MessagingRestOperations();

    constructor() {
        super();

        this._baseRoute = `/api/v1`;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);

        this._messagingOperations.configure(config);
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._messagingOperations.setReferences(references);
    }

    public register(): void {
        this.registerRoute("post", "/conversations/:id/messages", null as any, (req, res) => this._messagingOperations.addMessageToConversation(req, res));
        this.registerRoute("post", "/conversations", null as any, (req, res) => this._messagingOperations.createConv(req, res));
        this.registerRoute("get", "/users/:uid/conversations", null as any, (req, res) => this._messagingOperations.getUserConversations(req, res));
    }
}
