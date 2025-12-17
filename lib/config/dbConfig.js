const mongoose = require("mongoose");
const env = require("./env");

const connectDB = (callback) => {
    if(!env.mongoDBUrl){
      throw new Error("MongoDb url is not defined in the environment variables");
    }
    mongoose.connect(env.mongoDBUrl);
    const db = mongoose.connection;
  
    // Connected
    db.on("connected", () => {
      console.log("Connected to DB");
      console.log("✅ Connected with DB: ", db.name);
      callback();
    });
  
    // Disconnected
    db.on("disconnected", (err) => {
      console.log('DB connection disconnected.');
      console.log("⚠️ Mongoose event: disconnected : ",err);
      callback(err);
    });
  
    // Error
    db.on("error", (err) => {
        console.log('DB connection error: ' + err);
      console.error("❌ Mongoose event: error:", err.message);
      callback(err);
    });
};
  
module.exports = connectDB;