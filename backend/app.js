const express = require("express");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const createProject = require("./routes/createProjectRouter");
const suggestProject = require("./routes/suggestProjectRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const {Server} = require("socket.io");
const Message = require("./models/MessageModel");
const messageRoutes = require("./routes/messageRoutes");
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
        const {employerId, projectId, content, senderRole} = message;

        if (!content || !projectId || !senderRole) {
            console.error("Some required parameters are missing:", { content, projectId, senderRole });
            return;
        }

        try {
            const newMessage = new Message({
                content,
                senderId: socket.id,
                receiverId: employerId,
                projectId,
                role: senderRole
            });
            await newMessage.save();
            console.log("Message saved successfully");
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected : ", socket.id);
    });
});
connectDb();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // متدهای مجاز
    credentials: true, // اگر نیاز به ارسال کوکی‌ها دارید
}));

app.use((req, res, next) => {
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request:", {
        body: req.body,
        ...(req.file && {file: req.file})
    });
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/createProject", createProject);
app.use("/api/suggestProject", suggestProject);
app.use("/api/messages", messageRoutes);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
