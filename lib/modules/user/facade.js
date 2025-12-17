const userService = require("./service");
const customException = require("../../customException");
const bcrypt = require("bcrypt");

const createUser = async (info) => {
    try {
        let user = await userService.getOne({email : info.email});
        if(user){
            throw customException.completeCustomException("user_already_exist");
        }
        info.password = await bcrypt.hash(info.password, 10);
        let newUser = await userService.saveUser(info);
        return newUser;
    } catch (error) {
        throw error
    }
};


module.exports = {
    createUser
};