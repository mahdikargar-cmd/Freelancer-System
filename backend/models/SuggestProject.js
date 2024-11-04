const mongoose = require('mongoose');
const { Schema } = mongoose;

const suggestProjectSchema = new Schema({
    subject: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    role: { type: String, enum: ['freelancer'], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    created_At: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SuggestProjects', suggestProjectSchema);
