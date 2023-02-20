import commons, { ConfigParams } from "pip-services3-commons-nodex";
import { RestService } from "pip-services3-rpc-nodex";
import MessagingController from "../../controllers/messaging.controller";
import convSchema from "./schemas/conv.schema";
import messageSchema from "./schemas/message.schema";

export default class MessagingRestService extends RestService {
    private _messagingCtrl!: MessagingController;

    constructor() {
        super();
        this._baseRoute = "/conversations";
        this._dependencyResolver.put("controller", new commons.Descriptor("messaging", "controller", "*", "*", "1.0"))
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
    }

    public setReferences(references: commons.IReferences) {
        super.setReferences(references);
        this._messagingCtrl = this._dependencyResolver.getOneRequired('controller');
    }

    public register() {
        this._logger.debug("", "registering routes")
        this.registerRoute("get", "", null as any, async (req, res) => {
            try {
                let result = "ok"
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        });


        this.registerRoute("post", "", convSchema, async (req, res) => {
            try {
                let result = await this._messagingCtrl.createConv(req.body);
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        });

        this.registerRoute("post", "/:id/messages", messageSchema, async (req, res) => {
            const { id } = req.query;
            try {
                let result = await this._messagingCtrl.addMessageToConv(id, req.body);
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
}