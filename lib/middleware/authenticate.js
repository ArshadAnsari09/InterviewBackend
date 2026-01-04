const customException = require("../customException");
const jwtHandler = require("../jwtHandler");

const user = async (req, res, next) => {
    try {
        const acsToken = req.headers.accessToken || req.get('accessToken');
        if(!acsToken) throw customException.unauthorizeAccess();
        
        const payload = await jwtHandler.verifyUserToken(acsToken);
        if(!payload) throw customException.unauthorizeAccess();
        
        req.user = payload;
        next();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    user
}