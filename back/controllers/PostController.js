let PostService = require("../services/PostRoutesService");
let MessageController = require("../controllers/MessagesController").default;

module.exports = (app,jsonParser) => {
    app.post("/login",jsonParser,PostService.loginUser);
    app.post("/saveContact",jsonParser,PostService.saveOneContact);
    app.post("/contacts",jsonParser,PostService.getAllUserContacts);


    app.post("/conversations",jsonParser, async (req, res) => {
        return await new MessageController().getAllUserConversations(req, res);
    });
}
