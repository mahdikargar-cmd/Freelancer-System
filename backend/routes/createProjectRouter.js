// routes/createProjectRoutes.js
const express = require('express'); // Import express
const createProjectController = require('../controllers/createProjectController.js'); // Import the controller
const upload = require('../middleware/upload.js'); // Import the upload middleware

const router = express.Router();

// Create a new project
router.post('/create', upload.single('file'), createProjectController.createProject);

// Get all projects
router.get('/', createProjectController.getProject);

// Get a project by its ID
router.get('/:id', createProjectController.getProjectById);

module.exports = router; // Export the router
