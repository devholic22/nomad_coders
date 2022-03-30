import express from "express";
import http from "http";
import WebSocketServer from "ws";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  return res.render("home");
});
const handleListen = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

const server = http.createServer(app);
const wss = new WebSocketServer.Server({ server });

server.listen(PORT, handleListen);
