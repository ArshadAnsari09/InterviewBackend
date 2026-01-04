const dotenv = require("dotenv");
dotenv.config();

const env = {
    port: process.env.PORT || 4000,
    mongoDBUrl: process.env.MONGODB_URI,
    basicAuth: {
        username: process.env.BASIC_AUTH_USERNAME,
        password: process.env.BASIC_AUTH_PASSWORD,
    },
    stream: {
        apiKey: process.env.STREAM_API_KEY,
        apiSecret: process.env.STREAM_API_SECRET_KEY,
    },
    redis : {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
    },
    jwt : {
        secretKey : process.env.JWT_SECRET_KEY,
        expiresIn : process.env.JWT_EXPIRES_IN
    }
};

module.exports = env;