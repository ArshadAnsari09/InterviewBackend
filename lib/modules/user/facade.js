const userService = require("./service");
const customException = require("../../customException");
const successMsg = require("../../successMsg.json");
const bcrypt = require("bcrypt");
const appUtils = require("../../appUtils");
const jwtHandler = require("../../jwtHandler");
const redisClient = require("../../redisClient");

const buildUserTokenGenObj = (user) => {
    let userObj = {};
    userObj.user_id = user?._id;
    userObj.user_type = user?.userType;
    userObj.created = new Date();
    return userObj;
};

const loginSuccess = (user,jwt) => {
    return { accessToken : jwt,
        user : {
            email : user?.email,
            userType : user?.userType,
            avatar : user?.avatar,
        }
    };
};

const setRedisWithRes = async (jwt,user) => {
    try {
        const tokenVal = await redisClient.getValue(user?._id);
        if(tokenVal){
            await redisClient.deleteValue(user?._id);
            console.log("token deleted from redis");
            const userIdToString = JSON.stringify(user?._id);
            await redisClient.setValue(userIdToString,JSON.stringify(jwt));
            return loginSuccess(user,jwt);
        }else{
            return loginSuccess(user,jwt); 
        }

    } catch (error) {
        throw error;
    }
};

//=========================function start=============================

const createUser = async (info) => {
    try {
        let user = await userService.getOne({email : info.email,status : true,isDeleted : false});
        if(user) throw customException.completeCustomException("user_already_exist");
        
        info.password = await bcrypt.hash(info.password, 10);
        const savedUser =await userService.saveUser(info);
        const tokenObj = buildUserTokenGenObj(savedUser),       
         jwtToken = jwtHandler.generateToken(tokenObj),
         result = setRedisWithRes(jwtToken,savedUser);
        return result;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (info) => {
    try {
        if(info?.update?.email){
            const user = await userService.getOne({email: info?.update?.email,
                status: true,isDeleted: false,_id: { $ne: info?.userId }
            });
            if(user) throw customException.completeCustomException("user_already_exist_with_this_email");
        }
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
            {status:0,isDeleted:0,__v:0,createdAt:0,updatedAt:0,lastLogin:0});
        if(!user) throw customException.completeCustomException("user_not_found");

        const isPassMatched = await appUtils.checkHashPass(info?.password,user?.password);
        if(!isPassMatched) throw customException.completeCustomException("invalid_password");
        
        const tokenObj = buildUserTokenGenObj(user);        
        const jwtToken = jwtHandler.generateToken(tokenObj);
        const result = setRedisWithRes(jwtToken,user);
        return result;
    } catch (error) {
        throw error;
    }
};

const getUser = async (info) => {
   try {
     let user = await userService.getOne({_id : info?.userId,status : true,isDeleted : false},
        {status:0,isDeleted:0,__v:0,createdAt:0,updatedAt:0,lastLogin:0,password:0});
     if(!user) throw customException.completeCustomException("user_not_found");
     else return user;
   } catch (error) {
     throw error;
   }
};

const getUserList = async (info) => {
    try {
        let usersCount = await userService.userList(info,true).countDocuments();
        let usersList = await userService.userList(info);
        usersList = appUtils.sorting(usersList, info);
        return { total : usersCount,users : usersList};
    } catch (error) {
        throw error;
    }
};

const logout = async (info) => {
    try {
        const result = await jwtHandler.expireToken(info);
        if(result) return successMsg.logout_success;
        else throw customException.completeCustomException("logout_failed");
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createUser,
    updateUser,
    changePassword,
    login,
    getUser,
    getUserList,
    logout
};