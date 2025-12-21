const userService = require("./service");
const customException = require("../../customException");
const successMsg = require("../../successMsg.json");
const bcrypt = require("bcrypt");
const appUtils = require("../../appUtils");

const createUser = async (info) => {
    try {
        let user = await userService.getOne({email : info.email,status : true,isDeleted : false});
        if(user) throw customException.completeCustomException("user_already_exist");
        
        info.password = await bcrypt.hash(info.password, 10);
        await userService.saveUser(info);
        return successMsg.user_create;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (info) => {
    try {
        const updatedUser = await userService.findByIdAndUpdate(
            {_id : info?.userId,status : true, isDeteled : false},info?.update,{new : true});
        if(!updatedUser) throw customException.completeCustomException("user_not_found");

        return successMsg.user_update;
    } catch (error) {
        throw error;
    }
};

const changePassword = async (info) => {
    try {
        const user = await userService.getOne({email : info?.email,status : true,isDeleted : false});
        if(!user) throw customException.completeCustomException("user_not_found");

        const isPassMatched = await appUtils.checkHashPass(info?.oldPassword,user?.password);
        if(!isPassMatched) throw customException.completeCustomException("invalid_password");

        const newPassword = await bcrypt.hash(info?.newPassword, 10);
        await userService.findByIdAndUpdate({_id:user?._id},{password : newPassword});
        return successMsg.password_change;
    } catch (error) {
        throw error;
    }
};

const login = async (info) => {
    try {
        const user = await userService.getOne({email : info?.email,status:true,isDeleted:false},
            {status:0,password:0,isDeleted:0,__v:0,createdAt:0,updatedAt:0,lastLogin:0});
        if(!user) throw customException.completeCustomException("user_not_found");

        const isPassMatched = await appUtils.checkHashPass(info?.password,user?.password);
        if(!isPassMatched) throw customException.completeCustomException("invalid_password");

        return user;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createUser,
    updateUser,
    changePassword,
    login
};