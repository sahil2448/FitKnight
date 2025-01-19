let mongoose = require("mongoose");
const sampleGroups = [
  {
    name: "Morning Yoga Club",
    organiser: "Atul", // Only username for organiser
    users: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    activities: ["Yoga", "Meditation"],
    location: ["Mumbai", "Bandra"],
    frequency: "Daily",
    time: "6:00",
  },
  {
    name: "Morning Yoga Club",
    organiser: "Chaitanya",
    users: [
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    ],
    activities: ["Yoga", "Meditation"],
    location: ["Mumbai", "Bandra"],
    frequency: "Daily",
    time: "6:00 AM - 7:00 AM",
  },
  {
    name: "Weekend Hikers",
    organiser: "prabhas",
    users: [
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    ],
    activities: ["Hiking", "Adventure Sports"],
    location: ["Hyderabad", "Outer Hills"],
    frequency: "Weekends",
    time: "6:30 AM - 10:30 AM",
  },
  {
    name: "Zumba Lovers",
    organiser: "Animesh",
    users: [
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    ],
    activities: ["Zumba", "Dance Fitness"],
    location: ["Mumbai", "Juhu"],
    frequency: "Alternate Days",
    time: "7:00 PM - 8:00 PM",
  },
  {
    name: "Cycling Enthusiasts",
    organiser: "ranveer_singh",
    users: [
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    ],
    activities: ["Cycling", "Cardio Workouts"],
    location: ["Delhi", "Connaught Place"],
    frequency: "Daily",
    time: "6:00 AM - 8:00 AM",
  },
];

module.exports = { groupData: sampleGroups };
