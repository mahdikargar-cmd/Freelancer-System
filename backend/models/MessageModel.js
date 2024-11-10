const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    role: { // Can be 'freelancer', 'employer', or 'system' (AI response)
        type: String,
        enum: ['freelancer', 'employer', 'system'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);
