import express from "express";

const app = express();
const PORT = 4000;

const gossipMiddleware = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}
const handleHome = (req, res) => {
    return res.end();
}

const handleListening = () => console.log(`✅ Server listening on: http://localhost:${PORT}`);

app.get("/", gossipMiddleware, handleHome);

app.listen(PORT, handleListening);