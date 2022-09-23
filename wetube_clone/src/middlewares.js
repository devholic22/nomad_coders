import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

export const loggedInOnly = (req, res, next) => {
  if (!res.locals.loggedIn) {
    return res.redirect("/");
  }
  next();
};

export const anonOnly = (req, res, next) => {
  if (res.locals.loggedIn) {
    return res.redirect("/");
  }
  next();
};

export const avatarUpload = multer({ dest: "uploads/avatars/" });
export const videoUpload = multer({ dest: "uploads/videos/" });
