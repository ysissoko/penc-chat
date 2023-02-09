const mongoose = require("mongoose");
const Schema = mongoose.Schema


let userSchema = new Schema({
    name:{
        type:String
    },
    surname:{
        type:String
    },
    login:{
        type:String
    },
    numero:{
        type:String,
        unique: true,
    },
    hashedPassword:{
        type:String
    },
    password:{
        type:String
    }
});


module.exports.userModel = mongoose.model("user",userSchema)
