const express = require('express');
const createProjectController = require('../controllers/createProjectController');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/authMiddleware'); // وارد کردن middleware

const router = express.Router();

router.post('/create', verifyToken,upload.single('file'), createProjectController.createProject);

router.get('/', createProjectController.getProject);

router.get('/:id', createProjectController.getProjectById);

module.exports = router;
