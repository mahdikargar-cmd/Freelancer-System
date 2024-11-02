// routes/suggestProjectRoutes.js
const express = require('express'); // Import express
const suggestprojectController = require('../controllers/SuggestprojectController.js'); // Import the controller
const authMiddleware = require("../middleware/authMiddleware.js"); // Import the middleware

const router = express.Router();

router.post(
    '/createSuggest',
    suggestprojectController.registerSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest',
    authMiddleware, // No type annotation needed in JavaScript
    suggestprojectController.getSuggestProjectController.bind(suggestprojectController)
);

router.get(
    '/getSuggest/:id',
    suggestprojectController.getSuggestProjectById.bind(suggestprojectController)
);

console.log("In suggestProjectRoutes - Route Reached");

module.exports = router; // Export the router
