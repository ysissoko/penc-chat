import correlator from 'correlation-id';
import { ConfigParams, Descriptor, IReferences, Schema, ValueComparisonRule } from "pip-services3-commons-nodex";
import { RestService } from "pip-services3-rpc-nodex";
import MessagingController from "../../controllers/messaging.controller";
import { Conversation } from "../mongo/models/conversation.model";
import { IMessage } from "../mongo/models/message.model";
import convSchema from "./schemas/conv.schema";
import messageSchema from "./schemas/message.schema";
import Utils from "./schemas/utils";

export default class MessagingRestService extends RestService {
    private _messagingCtrl!: MessagingController;

    constructor() {
        super();

        this._dependencyResolver.put("controller", new Descriptor("messaging", "controller", "*", "*", "1.0"))
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._baseRoute = `/api/${config.getAsStringWithDefault("version", "v1")}`
    }

    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._messagingCtrl = this._dependencyResolver.getOneRequired('controller');
    }

    public register() {
        this.registerRoute("post", "/conversations/:id/messages", null as any, async (req, res) => {
            const { id } = req.params;

            await correlator.withId(async () => {
                try {
                    Utils.validateSchema(req.body, messageSchema);
                    let result = await this._messagingCtrl.addMessageToConv(id, req.body);
                    this.sendResult(req, res, result);
                } catch (ex) {
                    this.sendError(req, res, ex);
                }
            })
        });

        this.registerRoute("post", "/conversations", null as any, async (req, res) => {
            const conv: Conversation = req.body;
            await correlator.withId(async () => {
                try {
                    Utils.validateSchema(conv, convSchema);
                    // Should be at least 2 participants in the conversation
                    Utils.validateSchema(conv.participantsUid.length, new Schema().withRule(new ValueComparisonRule("GTE", 2)));
                    // Check messages length should be at least the first message
                    Utils.validateSchema(conv.messages.length, new Schema().withRule(new ValueComparisonRule("GTE", 1)));
                    const firstMessage: IMessage = conv.messages[0];
                    Utils.validateSchema(firstMessage, messageSchema);

                    let result = await this._messagingCtrl.createConv(req.body);
                    this.sendResult(req, res, result);
                } catch (ex) {
                    this.sendError(req, res, ex);
                }
            });
        });

        this.registerRoute("get", "/users/:uid/conversations", null as any, async (req, res) => {
            const { uid } = req.params;
            await correlator.withId(async () => {
                try {
                    let result = await this._messagingCtrl.getUserConversations(uid);
                    this.sendResult(req, res, result);
                } catch (ex) {
                    this.sendError(req, res, ex);
                }
            });
        });
    }
}
