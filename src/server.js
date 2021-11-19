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

/* logger use */
app.use(logger);

/* global router */
const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

/* user router */
const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

/* video router */
const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

/* response "listen" statement */
app.listen(4000, handleListening);
