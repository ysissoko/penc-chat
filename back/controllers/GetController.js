let GetServices = require("../services/GetRoutesService");

module.exports = (app)=>{
    app.get("/users",GetServices.getUsers);
}