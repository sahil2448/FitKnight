const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String, // Store image URL or file path
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Default image
  },

  password: {
    type: String,
    required: true,
  },

  goals: {
    type: [String],
  },
  preferences: {
    type: [String],
  },
  availability: {
    type: String,
  },
  mobile: {
    type: Number,
    // unique: true,
    match: /^[0-9]{10}$/, // Ensures exactly 10 digits
  },
  gmail: {
    type: String,
    // unique: true,
    match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
