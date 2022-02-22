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

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
function handleConnection(socket) {
  console.log(socket);
}
wss.on("connection", handleConnection);
server.listen(PORT, handleListening);
