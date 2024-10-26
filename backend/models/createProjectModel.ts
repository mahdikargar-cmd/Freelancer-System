import mongoose, { Schema, Document } from 'mongoose';

interface ICreateProject extends Document {
  subject: string;
  category: string;
  deadline: number;
  description: string;
  file?: string;
  skills: string[];
  range: {
    min: number;
    max: number;
  };
  createdAt?: Date;
}

const createSchema: Schema = new mongoose.Schema({
  subject: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Number, required: true },
  description: { type: String, required: true },
  file: { type: String, required: false },
  skills: { type: [String], required: true },
  range: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICreateProject>('CreateProject', createSchema);
