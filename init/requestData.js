const sampleRequestUsers = [
  {
    username: "shahrukh_khan",
    image: {
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "shahrukh_khan.jpg",
    },
    password: "srkKing123",
    goals: ["Acting Excellence", "Philanthropy"],
    preferences: ["Fitness", "Travel"],
    availability: "Weekends",
    mobile: 9876543210,
    gmail: "shahrukh.khan@gmail.com",
  },
  {
    username: "amitabh_bachchan",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "amitabh_bachchan.jpg",
    },
    password: "bigBsecure456",
    goals: ["Versatile Acting", "Public Speaking"],
    preferences: ["Classic Music", "Books"],
    availability: "Daily",
    mobile: 9123456789,
    gmail: "amitabh.bachchan@gmail.com",
  },
  {
    username: "UserX",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "deepika_padukone.jpg",
    },
    password: "deepikaPass789",
    goals: ["Fitness", "Mental Health Awareness"],
    preferences: ["Healthy Eating", "Yoga"],
    availability: "Flexible",
    mobile: 9234567890,
    gmail: "deepika.padukone@gmail.com",
  },
  {
    username: "prabhas",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "prabhas.jpg",
    },
    password: "prabhasStar123",
    goals: ["Pan-India Projects", "Adventure Sports"],
    preferences: ["Outdoor Activities", "South Indian Cuisine"],
    availability: "Weekends",
    mobile: 9345678901,
    gmail: "prabhas.actor@gmail.com",
  },
  {
    username: "UserY",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "alia_bhatt.jpg",
    },
    password: "aliaCute555",
    goals: ["Music", "Acting Growth"],
    preferences: ["Dance", "Animal Welfare"],
    availability: "Weekdays",
    mobile: 9456789012,
    gmail: "alia.bhatt@gmail.com",
  },
  {
    username: "ranveer_singh",
    image: {
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "ranveer_singh.jpg",
    },
    password: "ranveerCool123",
    goals: ["Versatile Roles", "Fashion Trends"],
    preferences: ["Music", "Travel"],
    availability: "Flexible",
    mobile: 9567890123,
    gmail: "ranveer.singh@gmail.com",
  },
  {
    username: "hrithik_roshan",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "hrithik_roshan.jpg",
    },
    password: "hrithikFit456",
    goals: ["Dance Mastery", "Action Movies"],
    preferences: ["Gym Workouts", "Music"],
    availability: "Daily",
    mobile: 9789012345,
    gmail: "hrithik.roshan@gmail.com",
  },
  {
    username: "nawazuddin_siddiqui",
    image: {
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      filename: "nawazuddin_siddiqui.jpg",
    },
    password: "nawazAct123",
    goals: ["Method Acting", "Realistic Roles"],
    preferences: ["Books", "Nature Walks"],
    availability: "Weekends",
    mobile: 9901234567,
    gmail: "nawazuddin.siddiqui@gmail.com",
  },
  {
    username: "david_wilson",
    image: {
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "photo-5.jpg",
    },
    password: "David@789",
    goals: ["Muscle Gain"],
    preferences: ["Weight Lifting", "High-Intensity Workouts"],
    availability: "Evenings",
    mobile: 9876543214,
    gmail: "david.wilson@gmail.com",
  },
  {
    username: "sarah_jones",
    image: {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "photo-6.jpg",
    },
    password: "Sarah@2024",
    goals: ["Pilates"],
    preferences: ["Small Group Sessions", "Flexible Timings"],
    availability: "Flexible",
    mobile: 9876543215,
    gmail: "sarah.jones@gmail.com",
  },
  {
    username: "kevin_brown",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "photo-7.jpg",
    },
    password: "Kevin@123",
    goals: ["Endurance Training"],
    preferences: ["Long-Distance Running", "Outdoor Cycling"],
    availability: "Weekends",
    mobile: 9876543216,
    gmail: "kevin.brown@gmail.com",
  },
];

// module.exports = sampleRequestUsers;

module.exports = { requestUserData: sampleRequestUsers };
