import { Router } from 'express';
import createProjectController from '../controllers/createProjectController';
import upload from '../middleware/upload';

const router = Router();

// Create a new project
router.post('/create', upload.single('file'), createProjectController.createProject);

// Get all projects
router.get('/', createProjectController.getProject);

// Get a project by its ID
router.get('/:id', createProjectController.getProjectById);

export default router;
