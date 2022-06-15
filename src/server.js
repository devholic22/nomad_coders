import "./db";
import User from "./models/User"; // User db 등록
import Chat from "./models/Chat"; // Chat db 등록
import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import globalRouter from "./router/globalRouter";
import { logInMiddleware } from "./middleware";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL
    })
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(logInMiddleware);
app.use("/", globalRouter);

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const countUser = (roomId) => {
  return wsServer.sockets.adapter.rooms.get(roomId)?.size;
};

<<<<<<< HEAD
/* 소켓 처리 부분 */
=======
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

function publicRooms() {
  const sids = wsServer.sockets.adapter.sids;
  const rooms = wsServer.sockets.adapter.rooms;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

>>>>>>> parent of 12c0876 (2.10 User Count)
wsServer.on("connection", (socketWithClient) => {
  socketWithClient.on("visit", (roomId) => {
    socketWithClient.join(roomId);
    console.log("visit");
    console.log(wsServer.sockets.adapter.rooms);
    socketWithClient.to(roomId).emit("test", countUser(roomId));
  });
  socketWithClient.on("new_message", (roomId, msg, done) => {
    socketWithClient.to(roomId).emit("new_message", `${msg}`);
    done();
<<<<<<< HEAD
  });
  socketWithClient.on("disconnecting", () => {
    console.log("disconnecting");
    console.log(wsServer.sockets.adapter.rooms);
=======
    socketWithClient.to(roomName).emit("welcome", socketWithClient.nickname);
    wsServer.sockets.emit("room_change", publicRooms()); // 모든 room에 전달
    /*
    setTimeout(() => {
      done(); // 서버는 백엔드에서 함수를 호출하지만 함수는 front에서 실행된 것이다
      // 함수 내용은 front에서 적는데 언제 실행하는지는 서버에서 지정하는 것
    }, 5000);
    */
  });
  socketWithClient.on("disconnecting", () => {
    socketWithClient.rooms.forEach((room) =>
      socketWithClient.to(room).emit("bye", socketWithClient.nickname)
    );
>>>>>>> parent of 12c0876 (2.10 User Count)
  });
});

httpServer.listen(PORT, handleListen);
