import http from "http";
import WebSocket from "ws";
import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

/*
// app.listen(PORT, handleListen);
// http와 webSocket을 같이 쓰고 싶은 경우..
const server = http.createServer(app);
const wss = new WebSocket.WebSocketServer({ server });
// wss는 서버 전체를 위한 것, socket event는 특정 socket에서 이벤트가 발생했을 때 응답하는 것

// fake DB
const sockets = [];

const joinAlert = () => {
  sockets.forEach((socket) => {
    console.log(socket.nickname);
    socket.send(`${socket.nickname} Joined this room`); // 에러... 일단 스킵
  });
};

// connection event
wss.on("connection", (socketWithClient) => {
  const anonCount =
    sockets.filter((socket) => socket.nickname.includes("Anon")).length + 1;
  socketWithClient["nickname"] = `Anon${anonCount}`;
  sockets.push(socketWithClient);
  setTimeout(joinAlert, 1000);
  console.log("Connected to Browser ✅");

  // close event
  socketWithClient.on("close", () =>
    console.log("Disconnected from Browser ❌")
  );

  // message event
  socketWithClient.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((socket) =>
          socket.send(`${socketWithClient.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        sockets.forEach((socket) =>
          socket.send(
            `${socketWithClient.nickname}이 ${message.payload}로 이름 변경`
          )
        );
        socketWithClient["nickname"] = message.payload;
        break;
    }
    // console.log(message.toString("utf-8"));
    // socketWithClient.send(message.toString("utf-8"));
  });

  // send message
  // socketWithClient.send("hello!");
});
// socket은 연결된 브라우저와의 contact line이다.
// on 메소드는 백엔드에 연결된 사람의 정보를 제공해주고 그게 socket에서 온다

server.listen(PORT, handleListen);
*/

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socketWithClient) => {
  console.log(socketWithClient);
  socketWithClient.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done(); // 서버는 백엔드에서 함수를 호출하지만 함수는 front에서 실행된 것이다
      // 함수 내용은 front에서 적는데 언제 실행하는지는 서버에서 지정하는 것
    }, 5000);
  });
});

httpServer.listen(PORT, handleListen);
