import app from "./server";
import "./db";
import Video from "./models/Video";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);