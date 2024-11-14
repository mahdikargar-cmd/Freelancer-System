const express = require("express");
const router = express.Router();
const Project = require("../models/SuggestProject");
const Message = require("../models/MessageModel");

// Toggle AI status for a project and its messages
router.post("/toggleAI", async (req, res) => {
    const { projectId, aiLocked } = req.body;
    console.log("Updating AI status for project:", projectId, "to:", aiLocked);
    
    try {
        // Update project AI status with upsert option
        const project = await Project.findOneAndUpdate(
            { _id: projectId },
            { $set: { aiLocked: aiLocked }},
            { new: true, upsert: true }
        );
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        // Update all messages associated with this project
        await Message.updateMany(
            { projectId: projectId },
            { $set: { aiLocked: aiLocked } }
        );
        
        console.log("AI status updated successfully for project and messages");
        res.json({ 
            aiLocked: project.aiLocked,
            message: "AI status updated successfully"
        });
    } catch (error) {
        console.error("Error toggling AI:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get AI status for a project
router.get("/toggleAI/status/:projectId", async (req, res) => {
    const { projectId } = req.params;
    console.log("Fetching AI status for project:", projectId);
    
    try {
        // Find project and create if doesn't exist
        let project = await Project.findById(projectId);
        
        if (!project) {
            project = await Project.findOneAndUpdate(
                { _id: projectId },
                { $setOnInsert: { aiLocked: false }},
                { new: true, upsert: true }
            );
        }
        
        // Ensure aiLocked has a value
        if (project.aiLocked === undefined) {
            project.aiLocked = false;
            await project.save();
        }
        
        // Synchronize messages
        await Message.updateMany(
            { 
                projectId: projectId,
                aiLocked: { $ne: project.aiLocked }
            },
            { $set: { aiLocked: project.aiLocked } }
        );
        
        console.log("Current AI status:", project.aiLocked);
        res.json({ 
            aiLocked: project.aiLocked,
            message: "AI status retrieved successfully"
        });
    } catch (error) {
        console.error("Error fetching AI status:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Verify and fix AI status consistency
router.get("/toggleAI/verify/:projectId", async (req, res) => {
    const { projectId } = req.params;
    
    try {
        let project = await Project.findById(projectId);
        
        if (!project) {
            // Create project if it doesn't exist
            project = await Project.create({
                _id: projectId,
                aiLocked: false
            });
        }
        
        // Ensure aiLocked has a value
        if (project.aiLocked === undefined) {
            project.aiLocked = false;
            await project.save();
        }
        
        // Fix inconsistent messages
        const updateResult = await Message.updateMany(
            { 
                projectId: projectId,
                aiLocked: { $ne: project.aiLocked }
            },
            { $set: { aiLocked: project.aiLocked } }
        );
        
        res.json({
            status: "success",
            message: `Updated ${updateResult.modifiedCount} messages`,
            currentStatus: project.aiLocked
        });
    } catch (error) {
        console.error("Error verifying AI status:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;