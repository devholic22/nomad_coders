import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/public", express.static(process.cwd() + "/src/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}`);

const httpServer = http.createServer(app); // http 분리
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});

wsServer.on("connection", (socketWithFront) => {
  socketWithFront.on("join_room", (roomName, startMedia) => {
    socketWithFront.join(roomName);
    startMedia();
    socketWithFront.to(roomName).emit("welcome");
  });
  socketWithFront.on("offer", (offer, roomName) => {
    socketWithFront.to(roomName).emit("offer", offer);
  });
});
instrument(wsServer, {
  auth: false
});

httpServer.listen(PORT, handleListening);
