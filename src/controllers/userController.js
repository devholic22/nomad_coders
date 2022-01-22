import User from "../models/User.js";
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
      avatarUrl: process.env.DEFAULT_PROFILE,
      username,
      password,
      location
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
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
  const user = await User.findOne({ username, socialOnly: false });
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
        Accept: "application/json" // GitHub가 finalUrl을 json 형태로 인식하게 하기 위해 설정
        // 왜냐하면 access_token을 따로 분리해야 하기 때문이다.
      }
    })
  ).json(); // fetch 시 await 필요, json 시 await
  // 만들어진 finalUrl에 method와 headers를 설정한 뒤 POST 요청을 보낸다
  if ("access_token" in tokenRequest) {
    // access token
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`
        }
        // headers에 Authorization: token OAUTH-TOKEN 필요함
      })
    ).json(); // 다시 json 형태로 변형
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`
        }
      })
    ).json();
    // email은 primary와 verified가 모두 true여야 한다.
    const emailObj = emailData.find(
      (emailObj) => emailObj.primary === true && emailObj.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    // database에 github의 email로 등록된 user가 있는지 검사한다.
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      // 등록되었던 email이 아니므로 계정을 생성해야 한다.
      // 깃허브로 생성해서 비밀번호는 만들 수 없음
      user = await User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        avatarUrl: userData.avatar_url,
        socialOnly: true,
        location: userData.location
      });
    }
    // 만약 이메일로 등록된 유저가 있다면 유저 생성을 건너뛰고 로그인을 시킨다.
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // access token은 한 번만 사용된다.
    return res.redirect("/login");
  }
  // access token은 scope 내용에 대해서만 가능하도록 해 준다.
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      // get data from session
      user: { _id, avatarUrl }
    },
    body: { name, email, username, password },
    file // get data form
  } = req; // form에 작성된 user의 info 및 세션에 있는 user의 id를 불러옴

  const originUsername = res.locals.loggedInUser.username;
  const originEmail = res.locals.loggedInUser.email;
  const isExists = await User.exists({ $or: [{ username }, { email }] });

  if (isExists && (originUsername !== username || originEmail !== email)) {
    return res.status(400).render("edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "⚠️ This username/email is already taken."
    });
  }
  // const i = req.session.user.id와 같은 표현
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      password
    },
    { new: true } // 가장 최근에 업데이트 된 것을 리턴하도록 한다
  );
  // 세션은 업데이트 되지 않았으므로 세션을 다시 설정해줘야 한다
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password }
    },
    body: { oldPassword, newPassword, checkPassword }
  } = req;
  const isSame = await bcrypt.compare(oldPassword, password);
  if (!isSame) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "⚠️ The current password is incorrect."
    });
  }
  if (oldPassword === newPassword || oldPassword === checkPassword) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "⚠️ New password must different with old password."
    });
  }
  if (newPassword !== checkPassword) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "⚠️ The password does not match the confirmation."
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.user.password = newPassword; // 비밀번호 또한 세션에 있는 값을 바꿔줘야 한다.
  // send notification
  req.session.destroy();
  return res.redirect("/");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User"
    }
  });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  console.log(user);
  // const videos = await Video.find({ owner: user._id });
  return res.render("users/profile", {
    pageTitle: user.name,
    user
  });
};
