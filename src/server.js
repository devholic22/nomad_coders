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

/* 소켓 처리 부분 */
wsServer.on("connection", (socketWithClient) => {
  // console.log("rooms: ", wsServer.sockets.adapter.rooms);
  // console.log("sids: ", wsServer.sockets.adapter.sids);
  // console.log(socketWithClient);
  socketWithClient.on("visit", (userId) => {
    // console.log(`userId is ${userId}`);
    socketWithClient.join("test"); // 일단 test 룸에 강제로 join
    // console.log(socketWithClient.rooms);
  });
  socketWithClient.on("new_message", (msg, done) => {
    socketWithClient.to("test").emit("new_message", `${msg}`);
    done();
  });
});

httpServer.listen(PORT, handleListen);
