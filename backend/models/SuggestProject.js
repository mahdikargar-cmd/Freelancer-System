const mongoose = require('mongoose');

const SuggestProjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreateProject',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['freelancer'],
        required: true
    }
    ,
    price: {
        type: Number,
        required: true
    },
    deadline: {
        type: Number,
        required: true
    },
    aiLocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SuggestProject', SuggestProjectSchema);