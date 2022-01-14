import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

const home = (req, res) => {
    return res.send("hello");
}
const login = (req, res) => {
    return res.send("login");
}

const handleListening = () => console.log(`✅ Server listening on: http://localhost:${PORT}`);

app.use(logger);
app.get("/", home);
app.get("/login", login);

app.listen(PORT, handleListening);