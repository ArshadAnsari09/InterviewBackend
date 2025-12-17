const mongoose = require("mongoose");

const connectDB = (callback) => {
    mongoose.connect(process.env.MONGODB_URI);
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