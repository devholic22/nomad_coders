import http from "http";
import WebSocket from "ws";
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

const server = http.createServer(app); // http 분리
const wss = new WebSocket.Server({ server }); // ws 분리 (http와 같은 PORT)

// backEnd webSocket이 frontEnd와 연결되었다면 실행될 함수
wss.on("connection", (socketWithFront) => {
  console.log("✅ Connected to Browser");
  socketWithFront.on("close", () => console.log("❌ Disconnected to Browser"));
  socketWithFront.on("message", (message) =>
    console.log(message.toString("utf-8"))
  );
  socketWithFront.send("hello!");
});

server.listen(PORT, handleListening);
