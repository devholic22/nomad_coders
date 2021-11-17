/* express use */
import express from "express";

/* PORT 4000 */
const PORT = "4000";

/* express save in app */
const app = express();

/* middleware function */
const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to: ${req.url}`);
  next();
};

/* response handle function */
const handleHome = (req, res) => {
  return res.send("I still love you.");
};

/* response handle function */
const handleLogin = (req, res) => {
  return res.send("Login here.");
};

/* response "get (response)" statement */
app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

/* response "listen" statement */
app.listen(4000, handleListening);
