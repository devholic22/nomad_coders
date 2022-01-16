export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "create Account" });
export const postJoin = (req, res) => {
  console.log(req.body);
  res.end();
};
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
