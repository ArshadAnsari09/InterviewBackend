const constant = require("../../constant");
const cusExc = require("../../customException");
const appUtils = require("../../appUtils");

let obj = {};

const createSession = (req,_res,next) => {
    let data = {...req.body};

    if(!data.problem){
        obj.key = "problem";
        errObj(obj);
    }
    if(!data.difficulty){
        obj.key = "difficulty";
        errObj(obj);
    }
    next();
};

const errObj = ({ key, msg = false }) => {
    const error = {
        fieldName: key,
        message: constant.MESSAGES.KEY_EMPTY_INVALID.replace("{{key}}", key),
    };
    if (msg) error.message = `${msg}`;
    throw cusExc.validationErrors(error);
};

module.exports = {
    createSession,
}
