/* express use */
import express from "express";

/* PORT 4000 */
const PORT = "4000";

/* express save in app */
const app = express();

/* middleware function */
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

/* middleware function */
const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next(); // if url != "/protected", privateMiddleware run next middleware..
};

/* response handle function */
const handleHome = (req, res) => {
  return res.send("I still love you.");
};

/* response handle function */
const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

/* app.use(): global middleware statement */
app.use(logger);
app.use(privateMiddleware);

/* response "get (response)" statement */
app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

/* response "listen" statement */
app.listen(4000, handleListening);
