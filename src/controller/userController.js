import User from "../models/User";

export const getLogin = (req, res) => {
  return res.render("login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", {
      errorMsg: "🙅 이 이메일은 등록되지 않은 이메일이에요"
    });
  }
  const isPasswordCorrect = Boolean(password == user.password);
  if (!isPasswordCorrect) {
    return res.render("login", { errorMsg: "🙅 비밀번호가 달라요" });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const getRegister = (req, res) => {
  return res.render("register");
};

export const postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.exists({ email });
  if (exist) {
    return res.render("register", { errorMsg: "🙅 이미 등록된 이메일이에요" });
  }
  await User.create({
    name,
    email,
    password
  });
  return res.redirect("/login");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
