import { Schema, model, Document } from 'mongoose';

interface ISuggestProject extends Document {
    subject: string;
    deadline: string;
    description: string;
    price: string;
}

const suggestProjectSchema = new Schema<ISuggestProject>({
    subject: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }
});

const SuggestProjectModel = model<ISuggestProject>('SuggestProjects', suggestProjectSchema);

export default SuggestProjectModel;
