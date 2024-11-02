const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define the schema for the user
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employer', 'freelancer'], required: true }, // Role field
});

// Export the model
module.exports = mongoose.model('User', userSchema);
