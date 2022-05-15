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

server.listen(PORT, handleListen);
