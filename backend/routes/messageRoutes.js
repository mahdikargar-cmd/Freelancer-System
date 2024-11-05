const express = require("express");
const router = express.Router();
const Message = require("../models/MessageModel");

router.get("/project/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log("projectId : ",projectId)
        const messages = await Message.find({ projectId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "error in recieve messages : " });
    }
});

module.exports = router;
