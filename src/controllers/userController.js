import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "create Account" });

export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "⚠️ Password confirmation does not match."
    });
  }
  const isExists = await User.exists({ $or: [{ username }, { email }] });
  if (isExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "⚠️ This username/email is already taken."
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle,
      errorMessage: `❌ ${error._message}`
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "⚠️ An account with this username does not exists."
    });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "⚠️ Wrong password"
    });
  }
  // ⬇️ add user information into session
  req.session.loggedIn = true;
  req.session.user = user;

  console.log(`✅ ${user.username} LOG IN SUCCESED!`);
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // fetch는 무언가를 하고 싶거나 무언가를 가져오고 싶을 때 사용한다
  // 그런데 nodeJS에서는 fetch가 작동하지 않는다.
  // node-fetch 패키지 설치
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    })
  ).json();
  // 만들어진 finalUrl에 method와 headers를 설정한 뒤 POST 요청을 보낸다
  if ("access_token" in tokenRequest) {
    // access token
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`
        }
      })
    ).json();
    console.log(userRequest);
  } else {
    // access token은 한 번만 사용된다.
    return res.redirect("/login");
  }
};

export const logout = (req, res) => res.send("Log out");

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Remove User");

export const see = (req, res) => res.send("See User");
