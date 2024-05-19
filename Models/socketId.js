const mongoose = require('mongoose')

mongoose.createConnection("mongodb://localhost:27017/ChatterBox");

var socketId = mongoose.Schema({
    socketId: {
        type: String,
        reqiured: true
    },
    emailId:{
        type: String,
        reqiured : true
    }
});

module.exports = mongoose.model('socketId', socketId);