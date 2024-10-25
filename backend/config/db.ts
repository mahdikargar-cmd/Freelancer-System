import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
