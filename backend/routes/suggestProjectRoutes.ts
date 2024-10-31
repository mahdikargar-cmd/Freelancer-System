import express from 'express';
import suggestprojectController from '../controllers/SuggestprojectController'; // Default import

const router = express.Router();

router.post(
    '/createSuggest',
    suggestprojectController.registerSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest',
    suggestprojectController.getSuggestProjectController.bind(suggestprojectController)
);
router.get(
    '/getSuggest/:id',
    suggestprojectController.getSuggestProjectById.bind(suggestprojectController)
);
export default router;
