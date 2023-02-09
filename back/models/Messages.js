const mongoose = require("mongoose");
const objectId = mongoose.Schema.ObjectId;
const Schema = mongoose.Schema;


let messageSchema = new Schema({
    chat_identifier: {
      type: String
    },
    sender:{
        type:String,
    },
    recipients:[
        {
            //type: Schema.Types.Mixed,
            type: String,
            // of: String,
            required: true
        }
    ],
    messages:[
        {
            type: Map,
            of: String,
            required: true
        }
    ]
})

module.exports.messageSchema = new mongoose.model("messages",messageSchema);
