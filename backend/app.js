const express = require("express");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const createProject = require("./routes/createProjectRouter");
const suggestProject = require("./routes/suggestProjectRoutes");
const toggleAIRoute = require("./routes/toggleAIRoute");

const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const {Server} = require("socket.io");
const Message = require("./models/MessageModel");
const messageRoutes = require("./routes/messageRoutes");
const axios = require("axios");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log("کاربر متصل شد:", socket.id);

    socket.on("sendMessage", async (message) => {
        const { employerId, projectId, content, senderRole } = message;

        // Confirm the role is freelancer before saving or responding as freelancer
        if (senderRole !== "freelancer") {
            console.error("Invalid senderRole detected:", senderRole);
            return;
        }

        try {
            // Save the freelancer's message to the database
            const newMessage = new Message({
                content,
                senderId: socket.id,
                receiverId: employerId,
                projectId,
                role: senderRole
            });

            await newMessage.save();

            // Generate an AI response if the role is freelancer
            const response = await axios.post('http://localhost:5001/generate', {
                prompt: content
            });
            const aiResponse = response.data.response;

            // Save and emit the AI's response as a separate message
            const aiMessage = new Message({
                content: aiResponse,
                senderId: "system",
                receiverId: employerId,
                projectId,
                role: "system"
            });
            await aiMessage.save();

            // Emit both freelancer's message and AI's response
            socket.emit("receiveMessage", newMessage);
            socket.emit("receiveMessage", aiMessage);
        } catch (error) {
            console.error("Error in sendMessage:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
    });
});

connectDb();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use((req, res, next) => {
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request:", {
        body: req.body,
        ...(req.file && {file: req.file})
    });
    next();
});

// روترها
app.use("/api/auth", authRoutes);
app.use("/api/createProject", createProject);
app.use("/api/suggestProject", suggestProject);
app.use("/api/messages", messageRoutes);
app.use("/api", toggleAIRoute);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
