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
};

module.exports = env;