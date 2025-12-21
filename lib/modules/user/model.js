const mongoose = require("mongoose");
const constant = require("../../constant");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password : {
        type : String,
        required : true
    },
    lastLogin : {
        type: Date,
        default: new Date,
    },
    fullName : {
        type : String,
    },
    avatar : {
        type : String,
    },
    userType : {
        type : Number,
        num: [1, 2, 3],
        required : true,
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    status : {
        type : Boolean,
        default : true,
    }
},{ timestamps: true });

module.exports = mongoose.model(constant.DBCONSTANTS.USER, userSchema);