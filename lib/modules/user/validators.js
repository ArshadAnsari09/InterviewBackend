const constant = require("../../constant");
const cusExc = require("../../customException");
const appUtils = require("../../appUtils");

let obj = {};

const createUser = (req, _res, next) => {
    const data = {...req.body};
    if(!data.email){
        obj.key = "email";
        errObj(obj);
    }
    next();
};

const updateUser = (req, _res, next) => {
    const data = { ...req.body };
    const update = {};

    if (data.email) update.email = data.email;
    if (data.password) update.password = data.password;
    if (data.NoOfQuiz) update.NoOfQuiz = data.NoOfQuiz;
    if (data.fullName) update.fullName = data.fullName;
    if (data.avatar) update.avatar = data.avatar;
    if (data.status !== undefined) update.status = data.status;
    if (data.isDeleted !== undefined) update.isDeleted = data.isDeleted;

    if (!appUtils.isObjEmp(update)) {
        req.update = update;
    } else {
        next(cusExc.completeCustomException('nothing_update', false));
    }
    next();
};

const changePassword = (req, _res, next) => {
    const data = {...req.body};
    
    if(!data.email){
        obj.key = "email";
        errObj(obj);
    }
    if(!data.oldPassword){
        obj.key = "oldPassword";
        errObj(obj);
    }
    if(!data.newPassword){
        obj.key = "newPassword";
        errObj(obj);
    }

    if(data?.oldPassword === data?.newPassword){
        const obj = {key : "newPassword", msg:"New password must be different from old password"};
        errObj(obj);
    }
    next();
};

const login = (req, _res, next) => {
    const data = {...req.body};
    if(!data.email){
        obj.key = "email";
        errObj(obj);
    }
    if(!data.password){
        obj.key = "password";
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
    createUser,
    updateUser,
    changePassword,
    login
}