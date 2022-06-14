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

/* 소켓 처리 부분 */
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
  });
  socketWithClient.on("disconnecting", () => {
    console.log("disconnecting");
    console.log(wsServer.sockets.adapter.rooms);
  });
});

httpServer.listen(PORT, handleListen);
