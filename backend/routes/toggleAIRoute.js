const express = require("express");
const router = express.Router();
const Project = require("../models/SuggestProject");

router.post('/toggleAI', async (req, res) => {
    const { projectId } = req.body;
    if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
    }

    try {
        // Find the project and toggle the AI lock
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.aiLocked = !project.aiLocked; // Toggle the AI lock
        await project.save();

        return res.status(200).json({ aiLocked: project.aiLocked }); // Return new AI lock status
    } catch (error) {
        console.error("Error toggling AI:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/toggleAI/status/:projectId', async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ aiLocked: project.aiLocked });
    } catch (error) {
        console.error('Error fetching AI lock status:', error);
        res.status(500).json({ message: 'Error fetching AI lock status' });
    }
});

module.exports = router;