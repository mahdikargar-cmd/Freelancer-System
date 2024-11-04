const express = require('express');
const createProjectController = require('../controllers/createProjectController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/create', upload.single('file'), createProjectController.createProject);

router.get('/', createProjectController.getProject);

router.get('/:id', createProjectController.getProjectById);

module.exports = router;
