let userModel = require("../models/User").userModel;
let contactModel = require("../models/Contact").contactModel;
let messageModel = require("../models/Messages").messageSchema;
let MessageRepository = require("../repository/ConversationRepository").default;


class MessagesController {

    constructor(
        messageRepository = new MessageRepository()
    ) {
        this._messageRepository = messageRepository ;
    }


    async saveMessages(sender, recipients, text, chat_identifier){
        try{

            if(chat_identifier == null ){
                let messages = [{sender, text, name: sender, hour: new Date().toISOString()}] ;
                return await this._messageRepository.createTheStartOfConversation(sender, recipients,  messages) ;
            }

            if(chat_identifier !== null){
                let lastMessage = {sender, text, name: sender, hour: new Date().toISOString() };
                return await this._messageRepository.addMessageToConversationBetween(lastMessage, chat_identifier);
            }

        }catch(error){
            return {
                success: false,
                message: "OOPS! retry later",
                error: error
            };
        }

    }




    async getAllUserConversations(req, res){
        try{
            const { user:sender } = req.body;
            const response = await this._messageRepository.findAllConversationOf( sender ) ;

            res.send(response);
        }catch(error){
            return {
                success: false,
                message: "OOPS! retry later",
                error: error
            };
        }
    }





}


module.exports = { default: MessagesController };
