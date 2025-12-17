const mongoose = require("mongoose");
const constant = require("../../constant");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    lastLogin : {
        type: Date,
        default: new Date,
    }
},{ timestamps: true });

module.exports = mongoose.model(constant.DBCONSTANTS.USER, userSchema);