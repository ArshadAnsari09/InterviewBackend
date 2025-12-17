const mongoQuery = require("../../mongoQuery");
const userModel = require("./model");


const saveUser = (data) => {
  let newUser = new userModel(data);
  return newUser.save();
};

module.exports = {
    ...mongoQuery(userModel),
    saveUser
};
