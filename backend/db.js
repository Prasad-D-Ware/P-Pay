// import mongoose
const mongoose = require("mongoose");

//connnect mongoose to the db of ur desire | for transactions used in this project we will need a clustered db
mongoose.connect(
  "mongodb+srv://prasadware:QTK1BMd6m4el3UH2@cluster0.0ikj5rw.mongodb.net/paytm"
);

//user table/collection schema for storing user data
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

//generate model for user
const User = mongoose.model("User", UserSchema);

//bank table/collection schema
const BankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

// generate model for account
const Account = mongoose.model("Account", BankSchema);

//exports
module.exports = {
  User,
  Account,
};
