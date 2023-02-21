import { Descriptor, IReferences } from "pip-services3-commons-nodex";
import { RestService } from "pip-services3-rpc-nodex";
import MessagingController from "../../controllers/messaging.controller";

export class ConversationRestService extends RestService {
    private _messagingCtrl!: MessagingController;

    constructor() {
        super();
        this._baseRoute = "/conversations";
        this._dependencyResolver.put("controller", new Descriptor("messaging", "controller", "*", "*", "1.0"))
    }

    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._messagingCtrl = this._dependencyResolver.getOneRequired('controller');
    }

    public register() {
        this.registerRoute("post", "", null as any, async (req, res) => {
            try {
                let result = await this._messagingCtrl.createConv(req.body);
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
}