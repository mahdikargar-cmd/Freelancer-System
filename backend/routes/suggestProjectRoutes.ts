import express from 'express';
import SuggestprojectController from '../controllers/SuggestprojectController';

const router = express.Router();

router.post('/suggestProject', SuggestprojectController.resgisterSuggestProjectController);

export default router;
