const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
