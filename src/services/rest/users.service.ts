import { Descriptor, IReferences } from "pip-services3-commons-nodex";
import rpc from "pip-services3-rpc-nodex";
import MessagingController from "../../controllers/messaging.controller";

export class UsersRestService extends rpc.RestService {
    private _messagingCtrl!: MessagingController;

    constructor() {
        super();
        this._baseRoute = "/users";
        this._dependencyResolver.put("controller", new Descriptor("messaging", "controller", "*", "*", "1.0"))
    }

    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._messagingCtrl = this._dependencyResolver.getOneRequired('controller');
    }

    public register() {
        this.registerRoute("get", "/:uid/conversations", null as any, async (req, res) => {
            const { uid } = req.query;
            try {
                let result = await this._messagingCtrl.getUserConversations(uid);
                this.sendResult(req, res, result);
            } catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
}