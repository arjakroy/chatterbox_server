var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ChatterBox").then(() => console.log("Connected to MongoDB")); // Improved connection handling

var contact = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },


})

const usersSchema =  mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contacts: {
    type: [contact], // Array of Contact objects
    required: true, // Ensure contacts are always present
    default : []
  },
});

module.exports = mongoose.model("User", usersSchema);
