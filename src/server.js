import express from "express";

const app = express();
const PORT = 4000;

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}
const protectedMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
    console.log("Allowed, you may continue.");
    next();
}
const handleHome = (req, res) => {
    return res.send("I love middlewares.");
}
const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.");
}

const handleListening = () => console.log(`✅ Server listening on: http://localhost:${PORT}`);

app.use(logger, protectedMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

app.listen(PORT, handleListening);