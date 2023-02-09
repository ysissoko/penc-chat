let messageModelMongoDB = require("../models/Messages").messageSchema;
const { uuid } = require('uuidv4');



class ConversationRepository {

    constructor(model = messageModelMongoDB) {
        this._model = model ;
    }





    async addMessageToConversationBetween(lastMessage, chat_identifier){
        try{
            let conversation = await this._model.findOne(
                {
                    chat_identifier: chat_identifier
                }
            );

            conversation.messages.push(lastMessage);
            await conversation.save();

            return {
                success: true,
                data: conversation
            }
        }catch (error){
            return {
                success: false,
                error: error,
            }
        }
    }







    async createTheStartOfConversation(sender, receiver, messages){
        try{
            const conversation = {
                sender: sender,
                recipients: receiver,
                messages: messages,
                chat_identifier: uuid()
            }

            const response = await this._model.create(conversation);
            return {
                success: true,
                data: response
            }
        }catch (error){
            return {
                success: false,
                error: error,
            }
        }
    }




    async findAllConversationOf(sender){
        try{
            let whereIAmTheSender = await this._model.find({ sender: sender });

            let whereIAmInTheRecipients = await this._model.find(
                {"recipients": sender }
            );

            //console.log(whereIAmInTheRecipients);

            return [...whereIAmInTheRecipients, ...whereIAmTheSender];
        }catch(error){
            return {
                success: false,
                error: error,
            }
        }
    }







}


module.exports = { default: ConversationRepository }
