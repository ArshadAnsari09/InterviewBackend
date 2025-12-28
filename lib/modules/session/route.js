const session = require("express").Router();
const sessionFacade = require("./facade");
const validators = require("./validators");
const responseHandler = require("../../responseHandler");
const middleware = require("../../middleware");

session.route("/").post([ middleware.authenticate.user,validators.createSession],async (req,res) => {
    try {
        let info = {...req.body,user : req.user};
        let result = await sessionFacade.createSession(info);
        return responseHandler.sendSuccess(res, result);
    } catch (error) {
        return responseHandler.sendError(res, error);
    }
});

module.exports = session;