const express = require('express');
const createProjectController = require('../controllers/createProjectController');
const upload = require('../middleware/upload');

const router = express.Router();

// Create a new project
router.post('/create', upload.single('file'), createProjectController.createProject);

// Get all projects
router.get('/', createProjectController.getProject);

// Get a project by its ID
router.get('/:id', createProjectController.getProjectById);

module.exports = router;
