import "dotenv/config";
import app from "./server.js";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
