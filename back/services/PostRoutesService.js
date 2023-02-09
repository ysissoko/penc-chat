let userModel = require("../models/User").userModel;
let contactModel = require("../models/Contact").contactModel;


module.exports = {
    async loginUser(req,res){
        // fetch the data in the request
        let loginUser = req.body.login;
        let passwordUser = req.body.password;

        // send back the result
        res.send(await userModel
            .find({login:loginUser,password:passwordUser})
            .then((data)=>{
                return data;
            })
        );
    },

    async saveOneContact(req,res){
        let obj = null;

        try{
            // verify if the connected user is in the database
            const holder = await userModel.findOne({ numero :req.body.connected_user_phone_number });
            //console.log(holder);
            try{
                // verify if the id he wants to save is in the database
                //await userModel.findOne({_id:req.body.numberContact});
                let user_to_add = await userModel.findOne({ numero :req.body.numberContact });

                if(user_to_add !== null){
                    const elementToPush = {
                        number: req.body.numberContact,
                        name: req.body.nameContact,
                        id: user_to_add._id
                    };
                    await contactModel.findOneOrCreate({ holder: holder }, (err, page) => {
                        if (err) throw Error(err);
                    });

                    const contact_holder = await contactModel.findOne({ holder: holder })
                    contact_holder.contacts.push(elementToPush);
                    await contact_holder.save();

                    obj = {
                        success:true,
                        contacts:contact_holder.contacts
                    };
                } else {
                    obj = {
                        success: false,
                        message: "This user to add is not present in the database"
                    }
                }

            }catch(CastError){
                //console.log(CastError);
                obj = {
                    success:false,
                    message: "This id does not exist"
                }
            }

        }catch(Error){
            //console.log(Error);
            obj = {
                success:false,
                message: "There is an error"
            };
        }

        // return the obj to the client
        res.send(obj);
    },


    async getAllUserContacts(req,res){
        try{

            return await userModel.findOne({numero:req.body.user}).
                then(async (data)=>{

                    return await contactModel.findOne({holder:data._id})
                    .then((data)=>{
                        res.send(
                                {
                                    success:true,
                                    contacts:data.contacts
                                }
                            );
                    });
                });


          }catch(err){
            res.send({success:false});
        }
    },


}
