const mongoose = require('mongoose');  // Import mongoose
const { Schema, model } = mongoose;  // Destructure Schema and model from mongoose

// Define the schema for the suggested project
const suggestProjectSchema = new Schema({
    subject: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    user: { type: String, required: true }, // Store user email instead of ID
    created_At: { type: Date, default: Date.now }  // Automatically set created date
});

// Export the model
module.exports = model('SuggestProjects', suggestProjectSchema);
