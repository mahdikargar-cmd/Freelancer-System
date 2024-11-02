const express = require('express');
const suggestprojectController = require('../controllers/SuggestprojectController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    '/createSuggest',
    suggestprojectController.registerSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest',
    authMiddleware, // اضافه کردن نوع غیر ضروری در JavaScript
    suggestprojectController.getSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest/:id',
    suggestprojectController.getSuggestProjectById.bind(suggestprojectController)
);
console.log("In suggestProjectRoutes - Route Reached");

module.exports = router;
