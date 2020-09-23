const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstname: {
        type:String,
        required:true,
        trim:true,
        minlength:2
    },
    lastname: {
        type:String,
        required:true,
        trim:true,
        minlength:2
    },
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    position: {
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:5
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    dob: {
        type:Date,
        required:true
    },
    bio: {
        type:String
    },
}, {
    timestamps:true,
})


const User = mongoose.model('User', userSchema);

module.exports = User;