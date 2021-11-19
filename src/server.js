/* express use */
import express from "express";

/* morgan middleware use */
import morgan from "morgan";

/* PORT 4000 */
const PORT = "4000";

/* express save in app */
const app = express();

/* morgan middleware save in logger */
const logger = morgan("dev");

/* response handle function */
const handleHome = (req, res) => {
  return res.send("I still love you.");
};

/* response handle function */
const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

/* logger use */
app.use(logger);

/* response "get (response)" statement */
app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

/* response "listen" statement */
app.listen(4000, handleListening);
