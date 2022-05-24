import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

// app.listen(PORT, handleListen);
// http와 webSocket을 같이 쓰고 싶은 경우..
const server = http.createServer(app);
const wss = new WebSocket.WebSocketServer({ server });
// wss는 서버 전체를 위한 것, socket event는 특정 socket에서 이벤트가 발생했을 때 응답하는 것

// fake DB
const sockets = [];

// connection event
wss.on("connection", (socketWithClient) => {
  sockets.push(socketWithClient);
  console.log("Connected to Browser ✅");

  // close event
  socketWithClient.on("close", () =>
    console.log("Disconnected from Browser ❌")
  );

  // message event
  socketWithClient.on("message", (message) => {
    sockets.forEach((socket) => socket.send(message.toString("utf-8")));
    // console.log(message.toString("utf-8"));
    // socketWithClient.send(message.toString("utf-8"));
  });

  // send message
  // socketWithClient.send("hello!");
});
// socket은 연결된 브라우저와의 contact line이다.
// on 메소드는 백엔드에 연결된 사람의 정보를 제공해주고 그게 socket에서 온다

server.listen(PORT, handleListen);
