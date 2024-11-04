const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    projectId: { type: String, required: true },
    role: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel; // Make sure to use module.exports
