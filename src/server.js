import express from "express";

const app = express();
const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => {
    return res.send("<h1>I still love you.</h1>");
}
const handleLogin = (req, res) => {
    return res.send({message: "Login here."});
}

app.get("/", handleHome);
app.get("/login", handleLogin);

app.listen(PORT, handleListening);