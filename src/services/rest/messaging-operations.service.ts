import { withId } from 'correlation-id';
import { Descriptor, IReferences, Schema, ValueComparisonRule } from "pip-services3-commons-nodex";
import { RestOperations } from "pip-services3-rpc-nodex";
import MessagingController from "../../controllers/messaging.controller";
import { Conversation } from "../mongo/models/conversation.model";
import { IMessage } from "../mongo/models/message.model";
import categorySchema from './schemas/category.schema';
import convSchema from "./schemas/conv.schema";
import messageSchema from "./schemas/message.schema";
import productSchema from "./schemas/product.schema";
import shopSchema from './schemas/shop.schema';
import Utils from "./schemas/utils";

export default class MessagingRestOperations extends RestOperations {
    private _messagingCtrl!: MessagingController;

    constructor() {
        super();

        this._dependencyResolver.put("controller", new Descriptor("messaging", "controller", "*", "*", "1.0"));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._messagingCtrl = this._dependencyResolver.getOneRequired('controller');
    }

    async addMessageToConversation(req: any, res: any) {
        const { id } = req.params;

        await withId(async () => {
            try {
                Utils.validateSchema(req.body, messageSchema);
                let result = await this._messagingCtrl.addMessageToConv(id, req.body);
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        })
    }
    async createConv(req: any, res: any) {
        const conv: Conversation = req.body;
        await withId(async () => {
            try {
                Utils.validateSchema(conv, convSchema);
                // Should be at least 2 participants in the conversation
                Utils.validateSchema(conv.participants.length, new Schema().withRule(new ValueComparisonRule("GTE", 2)));
                // Check messages length should be at least the first message
                Utils.validateSchema(conv.messages.length, new Schema().withRule(new ValueComparisonRule("GTE", 1)));
                const firstMessage: IMessage = conv.messages[0];
                Utils.validateSchema(firstMessage, messageSchema);
                // validate the product associated to the conversation
                Utils.validateSchema(conv.product, productSchema);
                // validate category
                Utils.validateSchema(conv.product.category, categorySchema);
                // validate shop
                Utils.validateSchema(conv.shop, shopSchema);

                let result = await this._messagingCtrl.createConv(req.body);
                this.sendResult(req, res, result);
            } catch (ex) {
                console.error(ex)
                this.sendError(req, res, ex);
            }
        });
    }

    async getUserConversations(req: any, res: any) {
        const { uid } = req.params;
        await withId(async () => {
            try {
                let result = await this._messagingCtrl.getUserConversations(uid);
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
}
