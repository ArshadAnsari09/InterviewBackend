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

user.route("/").get([], async (req,res) => {
   try {
     let info = {...req.query};
     let result = await userFacade.getUserList(info);
     return responseHandler.sendSuccess(res, result);
   } catch (error) {
     return responseHandler.sendError(res, error);
   }
});

user.route("/login").post([validators.login], async (req,res) => {
     try {
          let info = {...req.body};
          let result = await userFacade.login(info);
          return responseHandler.sendSuccess(res, result);
     } catch (error) {
        return responseHandler.sendError(res, error);  
     }
});

user.route("/:userId").put([validators.updateUser],async (req,res) => {
   try {
        let info = {update : {...req.body},userId : req.params.userId};
        let result = await userFacade.updateUser(info);
        return responseHandler.sendSuccess(res, result);
   } catch (error) {
        return responseHandler.sendError(res, error);
   }
});

user.route("/:userId").get([], async (req,res) => {
   try {
      let info = {userId : req.params.userId};
      let result = await userFacade.getUser(info);
      return responseHandler.sendSuccess(res, result);
   } catch (error) {
     return responseHandler.sendError(res, error);
   }
});

user.route("/change/password").put([validators.changePassword], async (req,res) => {
     try {
          let info = {...req.body};
          let result = await userFacade.changePassword(info);
          return responseHandler.sendSuccess(res, result);
     } catch (error) {
          return responseHandler.sendError(res, error);
     }
});

module.exports = user;