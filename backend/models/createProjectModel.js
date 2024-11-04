const {Schema, model} = require("mongoose");
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
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('CreateProject', createSchema);
