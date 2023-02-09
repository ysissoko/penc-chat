const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
let app = express();
let corsOptions = {
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions));

//mongodb database
mongoose.connect('mongodb://localhost:27017/travel_house_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// create application/json parser
let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let MessagesController = new ( require("./controllers/MessagesController").default ) ;

const io = require("socket.io")(5000,
    {
        cors: {
            origin: "http://localhost:3000"
        }
    }
  );

io.on('connection',socket => {
    // get the id of the connected user
    const id = socket.handshake.query.id;

    // keeps the same user id
    socket.join(id);

    // when a user sends a message
    socket.on('send-message', async ({ receivers, text, chat_identifier }) => {
        // show data to the database


        let response = await MessagesController.saveMessages(id, receivers, text, chat_identifier);
        //console.log(response);

        receivers.forEach(( receiver ) => {
            const newReceivers = receivers.filter( r => r !== receiver);

            newReceivers.push(id);

            socket.broadcast.to(receiver).emit('receive-message',{
                recipients: newReceivers,
                sender: id,
                text,
                chat_identifier: response.data.chat_identifier
            });
        });
    })
});



//all the routes
require("./controllers/GetController")(app);
require("./controllers/PostController")(app,jsonParser);

app.listen(7000,()=>{console.log("port 7000 listening")});
