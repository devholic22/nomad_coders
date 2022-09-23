import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { username, email, password, passwordConfirm, location } = req.body;
  const isUserExist = await User.exists({ $or: [{ username }, { email }] });
  if (!isUserExist) {
    if (password == passwordConfirm) {
      await User.create({
        username,
        email,
        password: await User.passwordHash(password),
        location
      });
      return res.redirect("/login");
    }
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMsg: "⚠️ The password doesn't match."
    });
  }
  return res.status(400).render("join", {
    pageTitle: "Join",
    errorMsg: "⚠️ Username/Email already exists."
  });
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Log in" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      pageTitle: "Log in",
      errorMsg: "⚠️ This username not exist."
    });
  }
  const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.render("login", {
      pageTitle: "Log in",
      errorMsg: "⚠️ Password doesn't correct."
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEditProfile = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEditProfile = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl }
    },
    body: { username, email },
    file
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      username,
      email
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/");
};
export const changePassword = async (req, res) => {
  const {
    user: { _id }
  } = req.session;
  const { originPassword, newPassword } = req.body;
  if (originPassword == newPassword) {
    return res.status(400).render("edit-profile", {
      pateTitle: "Edit Profile",
      errorMsg: "⚠️ New password is same with Origin password."
    });
  }
  const user = await User.findById(_id);
  const ok = bcrypt.compareSync(originPassword, user.password);
  if (!ok) {
    return res.status(400).render("edit-profile", {
      pageTitle: "Edit Profile",
      errorMsg: "⚠️ Password not correct."
    });
  }
  user.password = await User.passwordHash(newPassword);
  user.save();
  req.session.destroy();
  return res.redirect("/");
};

export const deleteUser = async (req, res) => {
  const {
    user: { _id }
  } = req.session;
  await Video.deleteMany({ owner: _id });
  await User.findByIdAndDelete(_id);
  req.session.destroy();
  return res.redirect("/");
};

export const userProfile = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).populate("videos");
  if (user == null) {
    return res.status(404).redirect("/");
  }
  return res.render("user-profile", {
    pageTitle: `${user.username}`,
    user
  });
};
