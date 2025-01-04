const mongoose = require("mongoose");
const initData = require("./data.js");
const initData2 = require("./groupData.js");
const initData3 = require("./requestData.js");
const User = require("../models/user.js");
const Group = require("../models/group.js");
const RequestUser = require("../models/requestUsers.js");

main()
  .then(() => {
    console.log("connections established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fitKnight");
}

const init = async () => {
  await User.deleteMany({});
  await Group.deleteMany({});
  await RequestUser.deleteMany({});

  await User.insertMany(initData.data);
  await Group.insertMany(initData2.groupData);
  await RequestUser.insertMany(initData3.requestUserData);
};

init();
