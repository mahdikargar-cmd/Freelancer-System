const express = require("express");  // Import express
const connectDb = require("./config/db");  // Import database connection
const authRoutes = require("./routes/authRoutes");  // Import authentication routes
const createProject = require("./routes/createProjectRouter");  // Import create project routes
const suggestProject = require("./routes/suggestProjectRoutes");  // Import suggest project routes
const cors = require("cors");  // Import CORS middleware
const dotenv = require("dotenv");  // Import dotenv for environment variables
const http = require("http");  // Import http module
const MessageModel = require('./models/MessageModel');  // Import Message model
const { Server } = require("socket.io");  // Import socket.io server

dotenv.config();  // Load environment variables

const app = express();  // Create an Express application
const server = http.createServer(app);  // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  // CORS settings for client
        methods: ["GET", "POST"]
    }
});

// Socket.io connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (message) => {
        const { employerId, suggestionId, role, text } = message;

        // Check and save message in the database with user and project ID
        const newMessage = new MessageModel({
            userId: employerId,
            projectId: suggestionId,
            role,
            text
        });

        await newMessage.save();

        // Only send messages related to the specific user and project
        const filteredMessages = await MessageModel.find({ userId: employerId, projectId: suggestionId });
        socket.join(`suggestion_${suggestionId}`);
        io.to(`suggestion_${suggestionId}`).emit("receiveMessage", filteredMessages);
    });

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

connectDb();  // Connect to the database
app.use(express.json());  // Parse JSON bodies
app.use(cors({
    origin: 'http://localhost:3000',  // Client address
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    credentials: true,  // Allow credentials if needed
}));

app.use((req, res, next) => {
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request:", {
        body: req.body,
        ...(req.file && { file: req.file })  // Log file if it exists
    });
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/createProject", createProject);
app.use("/api/suggestProject", suggestProject);

const PORT = 5000;  // Define server port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Start the server
