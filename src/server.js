import express from "express";

const app = express();
const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => {
    return res.send("hello");
}

app.use("/", handleHome);

app.listen(PORT, handleListening);