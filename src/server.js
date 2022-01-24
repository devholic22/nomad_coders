import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const ws = new WebSocketServer({ server }); // http의 서버 위에 ws 서버를 올려둠으로써 같은 포트에서 운용할 수 있다.

ws.on("connection", (backSocket) => {
  console.log("✅ Connected to the Browser");
  backSocket.on("close", () => console.log("❌ Disconnected from the Browser"));
  backSocket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });
  backSocket.send("hello!!!");
});

server.listen(3000, handleListen);
