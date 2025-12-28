const jwt = require("jsonwebtoken");
const env = require("./config/env");
const customException = require("./customException");
const redisClient = require("./redisClient");
const userService = require("./modules/user/service");

const generateToken = (payload) => {
    return jwt.sign(payload, env.jwt.secretKey, { expiresIn: env.jwt.expiresIn || "1d" });
};

const verifyToken = (token) => {
    return jwt.verify(token, env.jwt.secretKey);
};

const verifyUserToken = async (accessToken) => {
    try {
        const tokenPayload = jwt.verify(accessToken, env.jwt.secretKey);
        if(!tokenPayload) throw customException.completeCustomException("invalid_token");

        const tokenVal = await redisClient.getValue(JSON.stringify(tokenPayload?.user_id));
        if(!tokenVal) throw customException.completeCustomException("invalid_token");
    
        if(tokenVal !== JSON.stringify(accessToken)) throw customException.unauthorizeAccess();
        const user = await userService.getOne({_id : tokenPayload?.user_id, status : true,isDeleted : false});
        return user;
    } catch (error) {
        throw error;
    }
};

const expireToken = async (req) => {
    try {
        const accessToken = req.headers.accessToken || req.get('accessToken');
        if(!accessToken) throw customException.unauthorizeAccess();
        else{
            const user = req.user;
            return await redisClient.deleteValue(JSON.stringify(user?._id));
        }
    } catch (error) {
        throw error;
    }
};

// const createUserChatToken = async (payload) => {

// }

module.exports = {
    generateToken,
    verifyToken,
    verifyUserToken,
    expireToken
}