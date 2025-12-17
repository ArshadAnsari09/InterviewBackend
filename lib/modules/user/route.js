const user = require("express").Router();
const userFacade = require("./facade");
const responseHandler = require("../../responseHandler");
const validators = require("./validators");

user.route("/").post([validators.createUser],async (req,res) => {
   try {
        let info = {...req.body};
        let result = await userFacade.createUser(info);
        return responseHandler.sendSuccess(res, result);
   } catch (error) {
        return responseHandler.sendError(res, error);
   }
});

module.exports = user;