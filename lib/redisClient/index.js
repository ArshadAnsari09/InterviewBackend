const redis = require("redis");
const env = require("../config/env");

let redisClient;

const init = () => {
   try {
        redisClient = redis.createClient({
            socket: {
                host: env.redis.host,
                port: env.redis.port,
                tls: false
            },
            password: env.redis.password,
        })
        redisClient.on('error',err=>{
           console.log('redis error: ',err)
        })
        redisClient.connect().then(()=>{
           console.log('redis connected')
        }).catch(err=>{
            console.log('redis failed: ',err)
        })
   } catch (error) {
       console.log("error while connecting to redis: ", error);
   }
}

init();

const setValue = async (key,val) => {
    try {
        const result = await redisClient.set(key,val);
        return result;
    } catch (error) {
        return error;
    }
};

const getValue = async (key) => {
    try {
        const result = await redisClient.get(key);
        return result;
    } catch (error) {
        return error;
    }
};

const deleteValue = async (key) => {
    try {
        const result = await redisClient.del(key);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    setValue,
    getValue,
    deleteValue
}