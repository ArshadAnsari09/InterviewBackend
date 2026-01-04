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

session.route("/").get([], async (req,res) => {
    try {
        let info = {...req,query};
        let result = await sessionFacade.getSessions(info);
        return responseHandler.sendSuccess(res, result);
    } catch (error) {
        return responseHandler.sendError(res, error);
    }
});

session.route("/:sessionId").get([middleware.authenticate.user],async (req,res) => {
    try {
        let info = req.params;
        let result = await sessionFacade.getSession(info);
        return responseHandler.sendSuccess(res, result);
    } catch (error) {
        return responseHandler.sendError(res, error);
    }
});

session.route("/:sessionId/join").post([middleware.authenticate.user],async (req,res) => {
    try {
        let info = {...req.params , user : req.user};
        let result = await sessionFacade.joinSession(info);
        return responseHandler.sendSuccess(res, result);
    } catch (error) {
        return responseHandler.sendError(res, error);
    }
});

session.route("/:sessionId/end").post([middleware.authenticate.user],async (req,res) => {
    try {
        let info = {...req.params , user : req.user};
        let result = await sessionFacade.endSession(info);
        return responseHandler.sendSuccess(res, result);
    } catch (error) {
        return responseHandler.sendError(res, error);
    }
});

module.exports = session;