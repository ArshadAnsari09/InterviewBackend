const mongoQuery = require("../../mongoQuery");
const userModel = require("./model");
const {pagination,regexIncase} = require("../../appUtils");


const saveUser = (data) => {
  let newUser = new userModel(data);
  return newUser.save();
};

const userList = (info, all = false) => {
  let query = _queryFilter(info),
      project = {},
      paginate = {};

  if (!all) {
      paginate = pagination(info);
  }
  return mongoQuery(userModel).getMany(query, project, paginate);
};

const _queryFilter = (info) => {
  let filter = {isDeleted: false };

  if (info.email) filter.email = regexIncase(info.email);
  if (info.fullName) filter.fullName = regexIncase(info.fullName);
  if (info.userType) filter.userType = info.userType;
  if (info.status !== undefined) filter.status = info.status;

  return filter;
}

module.exports = {
    ...mongoQuery(userModel),
    saveUser,
    userList
};
