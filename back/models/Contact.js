const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;


let contactSchema = new Schema({
    holder:{
        type:ObjectId,
        ref:"user"
    },
    contacts:[
        {
            number:String,
            name:String,
            id:String
        }
    ]
});


contactSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}


module.exports.contactModel = mongoose.model("contact",contactSchema)
