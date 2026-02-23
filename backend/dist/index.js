import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";
import MainRouter from "./Routes/main.router.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
const server = http.createServer(app);
// creating the web socket server 
// upgrading the clients
export const wss = new WebSocketServer({ server });
export const connectedUsers = new Map();
app.use(express.json());
app.use(cookieparser());
// if we keep here will will get the decode url json a, cookies 
// thi sis the woerking web scoket 
wss.on("connection", (ws, req) => {
    const userId = req.url?.split("?userId=")[1];
    // console.log("RAW REQ:", req.url);
    connectedUsers.set(String(userId), ws);
    // console.log("web socket connection started")
    ws.on("close", () => {
        connectedUsers.delete(userId);
    });
});
// routes 
app.use("/api/v1", MainRouter);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(" the app is running on the prot " + PORT);
});
