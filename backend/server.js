import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => res.send("CampusKart Backend Running"));

// Socket.io for Live Chat
io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => socket.join(roomId));
    socket.on("sendMessage", (data) => {
        io.to(data.roomId).emit("receiveMessage", data);
    });
});

server.listen(process.env.PORT, () => console.log("Server on 5000"));