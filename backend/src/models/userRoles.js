const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoles = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  //new user role field
  //user saved images includes title and url 
  images: [
    {
      title: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],

});

const User = mongoose.model("UserRoles", userRoles);

module.exports = User;
