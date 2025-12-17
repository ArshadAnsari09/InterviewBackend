const APIResponse = require("./APIResponse");
const customException = require("./customException");

// Internal function to send response
function _sendResponse(response, result, statusCode = null) {
    const code = statusCode || result.statusCode || 200;
    response.status(code).json(result);
}

// Send Error Response
function sendError(response, error) {
    let statusCode = error.status || error.statusCode || 500;

    if (error?.err?.errCode) {
        error = error.err;
    } else if (!error.errCode) {
        error = customException.intrnlSrvrErr(error?.message || error?.msg);
    }

    let result = new APIResponse(statusCode, error);
    if (result.err && result.err.status) delete result.err.status;
    
    _sendResponse(response, result, statusCode);
}

// Send Success Response
function sendSuccess(response, result, statusCode = 200) {
    let outResult = new APIResponse(statusCode, result);
    _sendResponse(response, outResult, statusCode);
}

// Error Handler Middleware
function handleError(error, req, res, next) {
    sendError(res, error);
}

// Default Route Handler (404)
const defaultRoute = (req, res) => {
    res.send(`<html>
        <head>
        <title>404 Not Found</title>
        </head>
        <body>
        <h1>404 Sorry, an error has occured, Requested page not found!</h1>
        </body>
    </html>`);
};

module.exports = {
    defaultRoute,
    sendSuccess,
    sendError,
    handleError
};
