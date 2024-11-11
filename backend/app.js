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

// Map to store chat states
const chatStates = new Map();

const getChatState = (projectId) => {
    if (!chatStates.has(projectId)) {
        chatStates.set(projectId, {
            questionIndex: 0,
            isAssessmentComplete: false
        });
    }
    return chatStates.get(projectId);
};

io.on("connection", (socket) => {
    console.log("کاربر متصل شد:", socket.id);

    socket.on("sendMessage", async (message) => {
        const {employerId, projectId, content, senderRole} = message;

        if (senderRole !== "freelancer") {
            console.error("Invalid senderRole detected:", senderRole);
            return;
        }

        try {
            const chatState = getChatState(projectId);

            // ذخیره پیام فریلنسر در دیتابیس
            const freelancerMessage = new Message({
                content,
                senderId: socket.id,
                receiverId: employerId,
                projectId,
                role: senderRole
            });

            await freelancerMessage.save();
            // ارسال پیام فریلنسر به فرانت‌اند
            socket.emit("receiveMessage", freelancerMessage);

            // بررسی قفل بودن هوش مصنوعی
            const project = await Message.findOne({ projectId });
            if (project && !project.aiLocked) {
                // درخواست پاسخ از هوش مصنوعی
                const response = await axios.post('http://localhost:5001/generate', {
                    prompt: content,
                    context: {
                        projectId,
                        question_index: chatState.questionIndex
                    }
                });

                // افزایش شمارنده سوال
                if (!chatState.isAssessmentComplete) {
                    chatState.questionIndex++;
                    if (chatState.questionIndex >= 3) {
                        chatState.isAssessmentComplete = true;
                    }
                }

                // ذخیره و ارسال پاسخ هوش مصنوعی
                const aiMessage = new Message({
                    content: response.data.response,
                    senderId: "system",
                    receiverId: employerId,
                    projectId,
                    role: "system"
                });
                await aiMessage.save();

                // فقط ارسال پاسخ هوش مصنوعی
                socket.emit("receiveMessage", aiMessage);
            }
        } catch (error) {
            console.error("Error in sendMessage:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
    });
});

// پاکسازی وضعیت‌های قدیمی هر ساعت
setInterval(() => {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    chatStates.forEach((state, projectId) => {
        if (state.lastUpdated < oneHourAgo) {
            chatStates.delete(projectId);
        }
    });
}, 60 * 60 * 1000);

connectDb();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use((req, res, next) => {
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