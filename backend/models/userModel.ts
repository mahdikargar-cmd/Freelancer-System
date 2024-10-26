import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'employer' | 'freelancer'; // نقش کاربر
}

const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employer', 'freelancer'], required: true }, // فیلد نقش
});

export default mongoose.model<IUser>('User', userSchema);
