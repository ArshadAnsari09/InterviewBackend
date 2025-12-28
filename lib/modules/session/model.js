const mongoose = require("mongoose");
const constant = require("../../constant");

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    problem : {
        type : String,
        required : true,
    },
    difficulty : {
        type : String,
        enum : ["easy", "medium", "hard"],
        required : true,
    },
    host : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    participant : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        default : null,
    },
    sessionStatus : {
        type : String,
        enum : ["active", "completed"],
        default : "active",
    },
    callId : {
        type : String,
        default : "",
    },
    status : {
        type : Boolean,
        default : true,
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps: true});

module.exports = mongoose.model(constant.DBCONSTANTS.USER_SESSION, userSessionSchema);