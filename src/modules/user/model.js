const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required:true,
        index: true,
    },
    phone: {
        type: Number,
        required:true,
        index: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false,    
    },
    lastLogin: {
        type: Date,
        default: new Date,
    }
},
    { timestamps: true });

//Export admin module
module.exports = mongoose.model("user", userSchema);