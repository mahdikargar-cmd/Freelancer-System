// controllers/SuggestprojectController.js
const SuggestProjectModel = require('../models/SuggestProject'); // Import the model

class SuggestProjectController {
    async registerSuggestProjectController(req, res) {
        try {
            const userEmail = req.user?.email; // Extract email from user

            if (!userEmail) {
                res.status(400).json({ message: 'Invalid or missing user email.' });
                return;
            }

            const { subject, deadline, description, price } = req.body; // Extract fields from request body

            if (!subject || !deadline || !description || !price) {
                res.status(400).json({ message: 'All fields are required.' });
                return;
            }

            const suggestData = {
                subject,
                deadline,
                description,
                price,
                user: userEmail, // Store email instead of ID
                role: 'freelancer' // Assign role
            };

            const newProject = new SuggestProjectModel(suggestData); // Create a new project
            await newProject.save(); // Save project to the database

            res.status(201).json({ message: 'Project suggestion submitted successfully', project: newProject });
        } catch (error) {
            console.error('Error in registerSuggestProject:', error);
            res.status(500).json({ message: 'Error in suggestProject submission', error: error.message });
        }
    }

    async getSuggestProjectController(req, res) {
        try {
            const userId = req.user?.id; // Extract user ID from request

            if (!userId) {
                res.status(400).json({ message: 'User ID not found in request.' });
                return;
            }

            const suggestProjects = await SuggestProjectModel.find({ user: userId }); // Find projects by user email

            res.status(200).json({ projects: suggestProjects });
        } catch (error) {
            console.error('Error fetching project suggestions:', error);
            res.status(500).json({ message: 'Error in fetching project suggestions', error: error.message });
        }
    }

    async getSuggestProjectById(req, res) {
        try {
            const project = await SuggestProjectModel.findById(req.params.id); // Find project by ID

            if (!project) {
                res.status(404).json({ message: 'Project suggestion not found' });
                return;
            }

            res.status(200).json(project); // Return the project
        } catch (error) {
            res.status(500).json({ message: 'Error fetching project suggestion', error });
        }
    }
}

module.exports = new SuggestProjectController(); // Export the controller
