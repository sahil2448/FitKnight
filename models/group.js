const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
  },

  organiser: {
    type: String,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "RequestUser", // This ensures that each entry in users is a reference to a User document
    },
  ],
  // users: {
  //   type: [String],
  //   default: [""],
  // },

  activities: {
    type: [String],
  },

  location: {
    type: [String],
  },

  frequency: String,
  time: String,
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
