const express = require("express");
const router = express.Router();
const Project = require("../models/MessageModel");

router.post("/toggleAI", async (req, res) => {
    const { projectId } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send("Project not found");
        }
        project.aiLocked = !project.aiLocked;
        await project.save();
        res.json({ aiLocked: project.aiLocked });

    } catch (error) {
        console.error("Error toggling AI:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
