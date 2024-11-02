const express = require("express");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const createProject = require("./routes/createProjectRouter");
const suggestProject = require("./routes/suggestProjectRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

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
io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // دریافت پیام از کلاینت و ارسال به همه کاربران
  socket.on("sendMessage", (message) => {
    const { employerId } = message;
    io.to(employerId).emit("receiveMessage", message);
  });

  // رویداد disconnect
  socket.on("disconnect", () => {
    console.log("کاربر قطع شد:", socket.id);
  });
});

connectDb();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // آدرس کلاینت (جایی که اپلیکیشن شما در حال اجراست)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // متدهای مجاز
  credentials: true, // اگر نیاز به ارسال کوکی‌ها دارید
}));

app.use((req, res, next) => {
  console.log("Incoming Request Body:", req.body);
  console.log("Incoming Request:", {
    body: req.body,
    ...(req.file && { file: req.file })
  });
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/createProject", createProject);
app.use("/api/suggestProject", suggestProject);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
