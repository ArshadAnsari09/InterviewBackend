const auth = require('basic-auth');
const env = require("../config/env");

const basicAuthentication = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    }
    const credentials = auth(req);
    if (!credentials || credentials.name !== env?.basicAuth?.username || credentials.pass !== env?.basicAuth?.password) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.send({message: 'Access denied'})
    } else {
        next();
    }
};

module.exports = {
    basicAuthentication
}