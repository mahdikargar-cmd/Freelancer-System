const mongoose = require('mongoose');
const { Schema } = mongoose;

const createSchema = new Schema({
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
  role: { type: String, enum: 'employer', required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CreateProject', createSchema);