import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "create Account" });
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "⚠️ Password confirmation does not match."
    });
  }
  const isExists = await User.exists({ $or: [{ username }, { email }] });
  if (isExists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "⚠️ This username/email is already taken."
    });
  }
  await User.create({
    name,
    email,
    username,
    password,
    location
  });
  return res.redirect("/login");
};
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
