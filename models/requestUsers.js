const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    url: String,
    filename: String,
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
    sparse: true,

    // match: /^[0-9]{10}$/, // Ensures exactly 10 digits
  },
  gmail: {
    type: String,
    sparse: true,

    // unique: true,
    // match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  },
});

const RequestUser = mongoose.model("RequestUser", requestUserSchema);

module.exports = RequestUser;
