const sessionModel = require("./model");
const mongoQuery = require("../../mongoQuery");
const {pagination,regexIncase} = require("../../appUtils");

const saveSession = (data) => {
    const newSession = new sessionModel(data);
    return newSession.save();
};

const sessionList = (info,all = false) => {
    try {
        let query = _queryFilter(info),
        project = {},
        paginate = {};
    
        if (!all) {
            paginate = pagination(info);
            return mongoQuery(sessionModel).getMany(query, project, paginate)
            .populate("host","email fullName avatar")
            .populate("participant","email fullName avatar");
        }
        return mongoQuery(sessionModel).getMany(query, project, paginate);
    } catch (error) {
        throw error;
    }
};

const _queryFilter = (info) => {
    let filter = {isDeleted: false };

    if (info.problem) filter.problem = regexIncase(info.problem);
    if (info.difficulty) filter.difficulty = info.difficulty;
    if (info.host) filter.host = info.host;
    if (info.participant) filter.participant = info.participant;
    if (info.sessionStatus) filter.sessionStatus = info.sessionStatus;
    if(info.callId) filter.callId = info.callId;
    if(info.status !== undefined) filter.status = info.status;
  
    return filter;
}


module.exports = {
    ...mongoQuery(sessionModel),
    saveSession,
    sessionList
}