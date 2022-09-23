import express from "express";
import {
  getLogin,
  postLogin,
  getSignup,
  postSignup
} from "./controllers/userController";
import "./db";
import "./models/User";

const app = express();
const PORT = 9000;

const handleListening = () =>
  console.log(`Server listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => {
  return res.redirect("/login");
};

app.engine("html", require("ejs").renderFile);
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", handleHome);
app.route("/login").get(getLogin).post(postLogin);
app.route("/signup").get(getSignup).post(postSignup);

app.listen(PORT, handleListening);
