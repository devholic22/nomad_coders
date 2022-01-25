import express from "express";

const app = express();
const PORT = 9000;

const handleListening = () =>
  console.log(`Server listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => {
  return res.redirect("/login");
};
const handleLogin = (req, res) => {
  return res.render("login.html");
};
const handleSignup = (req, res) => {
  return res.render("signup.html");
};

app.engine("html", require("ejs").renderFile);
app.set("views", process.cwd() + "/src/views");

app.use(express.static(__dirname + "/public"));

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/signup", handleSignup);

app.listen(PORT, handleListening);
