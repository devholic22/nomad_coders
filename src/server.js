import http from "http";
import { Server } from "socket.io";
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
const wsServer = new Server(httpServer);

const getPublicRooms = () => {
  const sids = wsServer.sockets.adapter.sids;
  const rooms = wsServer.sockets.adapter.rooms;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
};

wsServer.on("connection", (socketWithFront) => {
  socketWithFront["nickname"] = "Anon";
  socketWithFront.onAny((event) => {
    console.log(wsServer.sockets.adapter);
    console.log(`Socket Event: ${event}`);
  });
  socketWithFront.on("enter_room", (roomName, showRoom) => {
    socketWithFront.join(roomName);
    showRoom();
    socketWithFront.to(roomName).emit("welcome", socketWithFront.nickname);
  });
  socketWithFront.on("disconnecting", () => {
    socketWithFront.rooms.forEach((room) =>
      socketWithFront.to(room).emit("goodbye", socketWithFront.nickname)
    );
  });
  socketWithFront.on("new_message", (msg, room, done) => {
    socketWithFront
      .to(room)
      .emit("new_message", `${socketWithFront.nickname} : ${msg}`);
    done();
  });
  socketWithFront.on("nickname", (nickname) => {
    socketWithFront["nickname"] = nickname;
  });
});
httpServer.listen(PORT, handleListening);
