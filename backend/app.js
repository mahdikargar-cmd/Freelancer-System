const express = require('express');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const createProject=require('./routes/createProjectRouter');

require('dotenv').config();

const app = express();
connectDb();

app.use(express.json());
app.use(require('cors')());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/createProject',createProject);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
