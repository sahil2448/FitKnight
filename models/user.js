const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },

  image: {
    url: String,
    filename: String,
  },

  // password: {
  //   type: String,
  //   required: true,
  // },

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

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
