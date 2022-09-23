import User from "../models/User";

export const getLogin = (req, res) => {
  return res.render("login.html");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const isEmailExists = await User.exists({ email });
  if (!isEmailExists) {
    return res.render("login.html", {
      errorMessage: "This email is not registered in DB!"
    });
  }
  const user = await User.findOne({ email });
  if (password != user.password) {
    return res.render("login.html", {
      errorMessage: "Password dosen't match!"
    });
  }
  return res.render("home.html");
};

export const getSignup = (req, res) => {
  return res.render("signup.html");
};

export const postSignup = async (req, res) => {
  const { email, name, password } = req.body;
  const isEmailExists = await User.exists({ email });
  if (isEmailExists) {
    return res.render("signup.html", {
      errorMessage: "This email is already taken!"
    });
  }
  const user = await User.create({
    email,
    imageUrl: process.cwd() + "/src/public/resource/default.svg",
    name,
    password
  });
  return res.redirect("/login.html");
};
