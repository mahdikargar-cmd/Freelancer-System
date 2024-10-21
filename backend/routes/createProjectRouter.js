const createProjectController = require('../controllers/createProjectController');
const { Router } = require("express");
const router = Router();
const upload = require('../middleware/upload');

// Create a new project
router.post('/create', upload.single('file'), createProjectController.createProject);

// Get all projects
router.get('/', createProjectController.getProject);

// Get a project by its ID
router.get('/:id', createProjectController.getProjectById);

module.exports = router;
