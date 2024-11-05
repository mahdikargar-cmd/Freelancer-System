const express = require('express');
const suggestprojectController = require('../controllers/SuggestprojectController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// مسیر برای ایجاد پیشنهاد پروژه با احراز هویت
router.post(
    '/createSuggest',
    authMiddleware,
    suggestprojectController.registerSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest',
    authMiddleware,
    suggestprojectController.getSuggestProjectController.bind(suggestprojectController)
);

// مسیر برای دریافت پیشنهاد پروژه بر اساس شناسه
router.get(
    '/getSuggest/:id',
    authMiddleware,
    suggestprojectController.getSuggestProjectById.bind(suggestprojectController)
);
router.get('/employerMessages', authMiddleware, suggestprojectController.getEmployerMessages.bind(suggestprojectController));
router.get('/freelancerMessages', authMiddleware, suggestprojectController.getFreelancerMessages.bind(suggestprojectController));
console.log("In suggestProjectRoutes - Route Reached");

module.exports = router;
