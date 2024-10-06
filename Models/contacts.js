var mongoose = require("mongoose");
const uri = "mongodb+srv://Arjak_real:So5EGCgjvQanIqgn@cluster0.crakkng.mongodb.net/ChatterBox";
mongoose.connect(uri).then(() => console.log("Connected to MongoDB")); // Improved connection handling

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
