const constant = require("../../constant");
const cusExc = require("../../customException");
let obj = {};

const createUser = (req, _res, next) => {
    const data = {...req.body};
    if(!data.email){
        obj.key = "email";
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
    createUser
}