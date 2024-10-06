const mongoose = require('mongoose')
const uri = "mongodb+srv://Arjak_real:So5EGCgjvQanIqgn@cluster0.crakkng.mongodb.net/ChatterBox";

mongoose.createConnection(uri);

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
