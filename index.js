if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const axios = require("axios"); // For API calls

const session = require("express-session");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const Group = require("./models/group");
const RequestUser = require("./models/requestUsers");
const app = express();

const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const apiKey = process.env.GOOGLE_API_KEY;

// Set up session middleware
app.use(
  session({
    secret: "1234", // Choose a secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});
// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// connecting mongoose with database
main()
  .then(() => {
    console.log("connections established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fitKnight");
}

// initialize the passport using middleware:
app.use(passport.initialize());
app.use(passport.session());

//// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
//authenticate() Generates a function that is used in Passport's LocalStrategy

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// serializeUser() Generates a function that is used by Passport to serialize users into the session
// deserializeUser() Generates a function that is used by Passport to deserialize users into the session
// Route to render the signup page
app.get("/signup", (req, res) => {
  res.render("pages/signup");
});

app.post("/signup", async (req, res, next) => {
  const { username, password, mobile, gmail } = req.body;

  req.session.userData = { username, password, mobile, gmail };

  try {
    let user = new User({ mobile, gmail, username });

    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
    });
    req.flash("success", "Signed up successfully");
    res.redirect("/buddyInfo");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

app.get("/login", (req, res) => {
  res.render("pages/login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),

  async (req, res) => {
    req.session.userLogin = req.body.username;
    req.session.userData = { ...req.body };
    req.flash("success", "Welcome back to Fitknight !");
    res.redirect("/buddyInfo");
  }
);

app.get("/buddyInfo", (req, res) => {
  res.render("pages/buddyInfo.ejs");
});

app.post("/buddyInfo", upload.single("image[url]"), async (req, res) => {
  console.log(req.body);
  // const userLoggedIn = req.session.userLogin; // Access stored data

  // // Validate session data
  // if (!userLoggedIn) {
  //   return res.send("Session expired. Please sign up again.");
  // }

  let username = req.session.userData.username;
  let { goals, preferences, availability, image } = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  image = { url, filename };

  try {
    // Update user data
    let user = await User.findOneAndUpdate(
      { username: username }, // Query
      {
        $set: {
          goals: goals,
          preferences: preferences,
          availability: availability,
          image: image,
        },
      },
      { new: true }
    );

    req.session.userData = {
      username,
      goals,
      preferences,
      availability,
      image,
      mobile: user.mobile,
      gmail: user.gmail,
    };

    if (!user) {
      return res.send("User not found!");
    }
    await user.save();
    // console.log(user);
    req.flash("success", "Welcome to fitKnight family...!");
    res.redirect("/choice");
  } catch (err) {
    console.log(err);
    res.send("An error occurred while updating data.");
  }
});

app.get("/choice", (req, res) => {
  let buddy = req.session.userData;

  res.render("pages/choice.ejs", { buddy });
});

// buddy finder pov
app.get("/buddyDashboard", async (req, res) => {
  let buddy = req.session.userData;
  let data = await RequestUser.find({});
  req.session.data = data;
  let groups = await Group.find({});

  res.render("pages/buddyDashboard.ejs", { buddy, data, groups });
});

app.get("/buddyDashboard/buddyProfile", async (req, res) => {
  let buddy = req.session.userData;
  let groups = await Group.find({});
  console.log("buddy:", buddy);
  res.render("pages/buddyProfile.ejs", { buddy, groups });
});

app.get("/buddyDashboard/:fountUserId/Profile", async (req, res) => {
  let { fountUserId } = req.params;
  // let data = await RequestUser.find({});
  let data = req.session.data;
  console.log(data[0]._id);
  console.log(fountUserId);
  // console.log(data);
  console.log(data.length);

  let userX;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    if (data[i]._id === fountUserId) {
      userX = data[i];
    }
  }

  res.render("pages/userProfile.ejs", { user: userX });
});

app.get("/organiserInfo", async (req, res) => {
  res.render("pages/organiserInfo");
});

app.post("/organiserInfo", async (req, res) => {
  let info = req.body;
  let { username, password, image } = req.session.userData;
  console.log(req.session.userData);
  let group = new Group({ ...info, users: [] });
  await group.save();

  req.session.userData = { ...info, username, password, image };
  req.session.username = username;
  req.session.password = password;

  let pastGroups = await Group.find({});
  let sampleUsers = await RequestUser.find({});

  req.session.grp = group;
  req.session.info = info;
  req.session.grpName = group.name;
  req.session.grpLogo = image;

  let grpLogo = image;
  res.render("pages/groupDashboard.ejs", {
    info,
    username,
    password,
    sampleUsers,
    pastGroups,
    group,
    grpLogo,
  });
});

// get route for groupDash
app.get("/groupDashboard/:id", async (req, res) => {
  let pastGroups = await Group.find({});
  let sampleUsers = await RequestUser.find({});
  let info = req.session.info;
  let group = req.session.grp;

  let grpLogo = req.session.grpLogo;
  res.render("pages/groupDashboard.ejs", {
    pastGroups,
    sampleUsers,
    info,
    group,
    grpLogo,
  });
});

// GROUP ROUTE:
app.get("/groupDashboard/:id/group", async (req, res) => {
  let info = req.session.userData;
  let sampleUsers = await RequestUser.find({});
  let buddy = await User.find({ username: req.session.username });
  req.session.buddy = buddy;
  let group = req.session.grp;
  let orgUsername = group.organiser;

  res.render("pages/group.ejs", {
    info,
    sampleUsers,
    orgUsername,
    group,
    buddy,
  });
});

app.get("/groupDashboard/:id/group/profile", async (req, res) => {
  let buddy = req.session.buddy;

  let group = req.session.grp;

  res.render("pages/groupProfile.ejs", { group, buddy });
});

app.get("/groupDashboard/:id/group/:userId/profile", async (req, res) => {
  let group = req.session.grp;
  let { userId } = req.params;
  // let user = User.findById(userId);
  let user;
  for (let i = 0; i < group.users.length; i++) {
    if (group.users[i]._id === userId) {
      user = group.users[i];
    }
  }

  res.render("pages/userProfile.ejs", { group, user });
});

app.get("/groupDashboard/:id/group", (req, res) => {
  res.redirect("/group");
});

app.get("/groupDashboard/:id", (req, res) => {
  let id = req.session.grp.id;
  res.redirect(`/groupDashboard/${id}`);
});

// Edit Route:
app.get("/groupDashboard/:id/editGroup", async (req, res) => {
  let { id } = req.params;

  let group = await Group.findById(id); // Fetch group from database

  if (!group) {
    return res.send("Group not found!");
  }
  req.session.userData = { id, ...group };

  res.render("pages/editGroup.ejs", { info: group });
});

app.put("/groupDashboard/:id", async (req, res) => {
  let id = req.session.userData.id;
  let newInfo = req.body;

  await Group.findByIdAndUpdate(id, newInfo, {
    new: true,
    runValidators: true,
  });

  let group = await Group.findById(id);

  let pastGroups = await Group.find({});
  let sampleUsers = await RequestUser.find({});

  let username = req.session.username;
  let password = req.session.password;
  let info = req.body;

  req.session.info = info;
  req.session.grp = group;
  let grpLogo = req.session.grpLogo;

  res.render(`pages/groupDashboard.ejs`, {
    info,
    id,
    username,
    password,
    pastGroups,
    sampleUsers,
    group,
    grpLogo,
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
