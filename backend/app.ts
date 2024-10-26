import express, { Request, Response, NextFunction } from "express";
import connectDb from "./config/db";
import authRoutes from "./routes/authRoutes";
import createProject from "./routes/createProjectRouter";
import suggestProject from "./routes/suggestProjectRoutes";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server, Socket } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// اتصال Socket.io
io.on("connection", (socket: Socket) => {
  console.log("user connected:", socket.id);

  // دریافت پیام از کلاینت و ارسال به همه کاربران
  socket.on("sendMessage", (message: any) => {
    io.emit("receiveMessage", message);
  });

  // رویداد disconnect
  socket.on("disconnect", () => {
    console.log("کاربر قطع شد:", socket.id);
  });
});

connectDb();
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Incoming Request Body:", req.body);
  console.log("Incoming Request:", {
    body: req.body,
    ...(req.file && { file: req.file }) // Log 'file' only if it exists
  });
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/createProject", createProject);
app.use("/api/suggestProject", suggestProject);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
