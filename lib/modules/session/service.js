const sessionModel = require("./model");
const mongoQuery = require("../../mongoQuery");

const saveSession = (data) => {
    const newSession = new sessionModel(data);
    return newSession.save();
};


module.exports = {
    ...mongoQuery(sessionModel),
    saveSession,
}