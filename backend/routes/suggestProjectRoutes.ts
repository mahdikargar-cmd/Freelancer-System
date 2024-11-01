// routes/suggestProjectRoutes.ts
import express from 'express';
import suggestprojectController from '../controllers/SuggestprojectController';
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post(
    '/createSuggest',
    suggestprojectController.registerSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest',
    authMiddleware as express.RequestHandler, // اضافه کردن نوع
    suggestprojectController.getSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest/:id',
    suggestprojectController.getSuggestProjectById.bind(suggestprojectController)
);
console.log("In suggestProjectRoutes - Route Reached");

export default router;
