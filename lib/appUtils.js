const bcrypt = require("bcrypt");

const isObjEmp = (obj) => {
    return Object.keys(obj).length > 0 ? false : true;
};

const checkHashPass = async (pass,hashPass) => {
    return await bcrypt.compare(pass,hashPass);
};

module.exports = {
    isObjEmp,
    checkHashPass
}