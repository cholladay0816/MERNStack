const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const worklogSchema = new Schema({
    
    username: {
        type:String,
        required:true,
        minlength:3
    },
    description: {
        type:String,
        required:true,
        minlength:2
    },
    hours: {
        type:Number,
        required:true
    },
    date: {
        type:Date,
        required:true
    },

}, {
    timestamps:true,
})


const Worklog = mongoose.model('Worklog', worklogSchema);

module.exports = Worklog;