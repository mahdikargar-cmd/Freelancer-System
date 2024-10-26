import mongoose, { Schema, model, Document } from 'mongoose';

interface ISuggestProject extends Document {
    subject: string;
    deadline: string;
    description: string;
    price: string;
    user: mongoose.Types.ObjectId; // آیدی کاربر ثبت‌کننده پروژه
    created_At?: Date;
}

const suggestProjectSchema = new Schema<ISuggestProject>({
    subject: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // آیدی کاربر
    created_At: { type: Date, default: Date.now }
});

export default model<ISuggestProject>('SuggestProjects', suggestProjectSchema);
