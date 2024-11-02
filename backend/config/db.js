const mongoose = require('mongoose'); // Import mongoose
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message); // Log the error message
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB; // Export the connectDB function
