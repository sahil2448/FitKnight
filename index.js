const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

const User = require("./models/user");
const Group = require("./models/group");
const RequestUser = require("./models/requestUsers");
const app = express();

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set up session middleware
app.use(
  session({
    secret: "1234", // Choose a secret key
    resave: false,
    saveUninitialized: true,
  })
);

// connecting mongoose with database
main()
  .then(() => {
    console.log("connections established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fitKnight");
}

// Route to render the signup page
app.get("/signup", (req, res) => {
  res.render("pages/signup");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  req.session.userData = { username, password };

  try {
    // let buddy = { username, password };
    let searchUser = await User.findOne({ username });
    if (searchUser) {
      res.send("Username already exists...use different one");
    }
    let user = new User({ username, password });
    await user.save();
    // console.log(user);
    // let buddy = { username, password };
    res.redirect("/buddyInfo");
  } catch (err) {
    res.send(err);
  }
});

app.get("/buddyInfo", (req, res) => {
  res.render("pages/buddyInfo.ejs");
});

app.post("/buddyInfo", async (req, res) => {
  const userData = req.session.userData; // Access stored data

  // Validate session data
  if (!userData) {
    return res.send("Session expired. Please sign up again.");
  }

  let { username } = userData;
  let { goals, preferences, mobile, gmail, availability, image } = req.body;

  try {
    // Update user data
    let user = await User.findOneAndUpdate(
      { username: username }, // Query
      {
        $set: {
          goals: goals,
          preferences: preferences,
          mobile: mobile,
          gmail: gmail,
          availability: availability,
          image: image,
        },
      }, // Update fields
      { new: true } // Return updated document
    );

    req.session.userData = {
      ...userData,
      goals,
      preferences,
      mobile,
      gmail,
      availability,
      image,
    };

    if (!user) {
      return res.send("User not found!");
    }
    await user.save();
    // console.log(user);
    res.redirect("/choice");
  } catch (err) {
    console.log(err);
    res.send("An error occurred while updating data.");
  }
});

app.get("/choice", (req, res) => {
  let buddy = req.session.userData;
  // console.log("I am buddy");
  // console.log("I am buddy", JSON.stringify(buddy, null, 2));
  res.render("pages/choice.ejs", { buddy });
});

// buddy finder pov
app.get("/buddyDashboard", async (req, res) => {
  let buddy = req.session.userData;
  let data = await User.find({});
  // console.log(data);
  let groups = await Group.find({});
  
  res.render("pages/buddyDashboard.ejs", { buddy, data, groups });
});

app.get("/organiserInfo", async (req, res) => {
  // let info = req.body;
  // let organiser = req.session.userData;
  res.render("pages/organiserInfo");
});

app.post("/organiserInfo", async (req, res) => {
  let info = req.body;
  let { username, password } = req.session.userData;
  let group = new Group({ ...info, users: [] });
  await group.save();

  req.session.userData = { ...info, username, password };
  req.session.username = username;
  req.session.password = password;
  // console.log(req.session.userData);

  let pastGroups = await Group.find({});
  let sampleUsers = await RequestUser.find({});
  // console.log(pastGroups);

  // res.redirect("/groupDashboard");
  req.session.grp = group;
  req.session.info = info;
  req.session.grpName = group.name;
  res.render("pages/groupDashboard.ejs", {
    info,
    username,
    password,
    sampleUsers,
    pastGroups,
    group,
  });
});

// get route for groupDash
app.get("/groupDashboard/:id", async (req, res) => {
  let pastGroups = await Group.find({});
  let sampleUsers = await RequestUser.find({});
  let info = req.session.info; // Retrieve info from session if available
  let group = req.session.grp;

  res.render("pages/groupDashboard.ejs", {
    pastGroups,
    sampleUsers,
    info,
    group,
  });
});

// GROUP ROUTE:
app.get("/groupDashboard/:id/group", async (req, res) => {
  let info = req.session.userData;
  let sampleUsers = await RequestUser.find({});
  let buddy = await User.find({ username: req.session.username });

  let group = req.session.grp;
  let orgUsername = group.organiser;

  // console.log(req.body);
  // console.log(info);
  // console.log(group);
  // console.log(orgUsername);
  // console.log(orgUsername);
  // console.log(buddy);
  res.render("pages/group.ejs", {
    info,
    sampleUsers,
    orgUsername,
    group,
    buddy,
  });
});

// Edit Route:
app.get("/groupDashboard/:id/editGroup", async (req, res) => {
  // let info = req.session.userData;
  let { id } = req.params;
  // req.session.userData = { ...info, id };
  // info = req.session.userData;
  // console.log(info);
  let group = await Group.findById(id); // Fetch group from database

  if (!group) {
    return res.send("Group not found!");
  }
  req.session.userData = { id, ...group };

  res.render("pages/editGroup.ejs", { info: group });
});

app.put("/groupDashboard/:id", async (req, res) => {
  // console.log(req.session.userData);
  let id = req.session.userData.id;
  let newInfo = req.body;

  await Group.findByIdAndUpdate(id, newInfo, {
    new: true,
    runValidators: true,
  });

  // let id = req.session.userData.id;

  let group = await Group.findById(id);

  let pastGroups = await Group.find({});
  let sampleUsers = await RequestUser.find({});

  let username = req.session.username;
  let password = req.session.password;
  let info = req.body;

  req.session.info = info;
  req.session.grp = group;

  res.render(`pages/groupDashboard.ejs`, {
    info,
    id,
    username,
    password,
    pastGroups,
    sampleUsers,
    group,
  });
});
// app.get("/groupDashboard/:id", async (req, res) => {
//   res.render(`pages/groupDashboard.ejs`);
// });

// user routes:

// DELETE ROUTE
// app.get("/groupDashboard/:id/buddy/:buddyId", (req, res) => {
//   req.session.buddyId = req.params.buddyId;

//   res.redirect(`/groupDashboard/${req.params.id}`);
// });

app.delete("/groupDashboard/:id/buddy/:buddyId", async (req, res) => {
  const { buddyId, id } = req.params;

  try {
    let user = await RequestUser.findByIdAndDelete(buddyId);
    if (!user) {
      return res.send("User not found!");
    }
    res.redirect(`/groupDashboard/${id}`);
  } catch (err) {
    console.log(err);
    res.send("Failed to delete the user.");
  }
});

// ACCEPT ROUTE:
// app.get("/groupDashboard/:id/buddy/:buddyId", (req, res) => {
//   req.session.buddyId = req.params.buddyId;
//   res.redirect(`/groupDashboard/${req.params.id}`);
// });

app.put("/groupDashboard/:id/buddy/:buddyId", async (req, res) => {
  const { buddyId, id } = req.params;

  try {
    let user = await RequestUser.findById(buddyId);
    if (!user) {
      return res.send("User not found!");
    }

    let group = await Group.findById(id);

    console.log("Before Save:", group);

    // group.users.push(user._id);
    group.users.push(user._id);
    await group.save();

    group = await Group.findById(id).populate("users");
    console.log("After Save:", group); // Debugging after populate

    // await RequestUser.findByIdAndDelete(buddyId);

    req.session.grp = group;
    res.redirect(`/groupDashboard/${id}`);
  } catch (err) {
    console.log(err);
    res.send("Failed to delete the user.");
  }
});

app.listen(8080, () => {
  console.log("Listening to the port no. ", 8080);
});
