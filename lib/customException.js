const statusCodes = require("./statusCodes");
const Exception = require("./Exception");


const customException = {
    // Internal Server Error
    intrnlSrvrErr: (message = "Internal server error") => {
        return {
            errCode: "INTERNAL_SERVER_ERROR",
            message: message,
            status: 500,
            err: {
                errCode: "INTERNAL_SERVER_ERROR",
                message: message
            }
        };
    },

    // Bad Request Error
    badRequest: (message = "Bad request") => {
        return {
            errCode: "BAD_REQUEST",
            message: message,
            status: 400,
            err: {
                errCode: "BAD_REQUEST",
                message: message
            }
        };
    },

    // Unauthorized Error
    unauthorizeAccess: (err=false) => {
        if (!err) 
            return new Exception(statusCodes.unauth_access.code, statusCodes.unauth_access.msg, 402);
        else
            return new Exception(statusCodes.unauth_access.code, statusCodes.unauth_access.msg, 402, err);
    },

    // Forbidden Error
    forbidden: (message = "Forbidden") => {
        return {
            errCode: "FORBIDDEN",
            message: message,
            status: 403,
            err: {
                errCode: "FORBIDDEN",
                message: message
            }
        };
    },

    // Not Found Error
    notFound: (message = "Resource not found") => {
        return {
            errCode: "NOT_FOUND",
            message: message,
            status: 404,
            err: {
                errCode: "NOT_FOUND",
                message: message
            }
        };
    },

    // Validation Error
    validationErrors: err => {
        return new Exception(
            406,
            err.message,
            406
        )
    },

    // Conflict Error
    conflict: (message = "Resource conflict") => {
        return {
            errCode: "CONFLICT",
            message: message,
            status: 409,
            err: {
                errCode: "CONFLICT",
                message: message
            }
        };
    },

    //custom exception
    completeCustomException: (type, err=false) => {
        if (!err) 
            return new Exception(statusCodes[type].code, statusCodes[type].msg, statusCodes[type].status);
        else
            return new Exception(
                statusCodes[type].code,
                statusCodes[type].msg,
                statusCodes[type].status,
                err
            );
    }
};

module.exports = customException;

