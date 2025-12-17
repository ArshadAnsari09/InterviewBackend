const constant = require("../../constant");
const cusExc = require("../../customException");
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

    // if (data.name) update.name = data.name;
    // if (data.NoOfVideos) update.NoOfVideos = data.NoOfVideos;
    // if (data.NoOfQuiz) update.NoOfQuiz = data.NoOfQuiz;
    // if (data.NoOfContent) update.NoOfContent = data.NoOfContent;
    // if (data.DisplayIndex) update.DisplayIndex = data.DisplayIndex;
    // if (data.CourseId) update.CourseId = data.CourseId;
    // if (data.ModuleTime) update.ModuleTime = data.ModuleTime;
    // if (data.status !== undefined) update.status = data.status;
    // if (data.isDeleted !== undefined) update.isDeleted = data.isDeleted;
    // if (data.NoOfCodingQuestions) update.NoOfCodingQuestions = data.NoOfCodingQuestions;
    // if (data.NoOfAssessment) update.NoOfAssessment = data.NoOfAssessment;

    // if (!appUtils.isObjEmp(update)) {
    //     req.update = update;
    // } else {
    //     next(cusExc.completeCustomException('nthng_uupdate', false));
    // }
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
    createUser
}