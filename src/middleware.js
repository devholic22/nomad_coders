export const logInMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

// 자기 자신과의 채팅은 일단 방지
export const preventSelf = (req, res, next) => {
  const userId = req.params.userId;
  const loggedInId = req.session.user._id;
  if (String(userId) == String(loggedInId)) {
    return res.redirect("/");
  }
  next();
};

// 로그인 안 한 사람 방지
export const preventAnon = (req, res, next) => {
  if (!Boolean(req.session.loggedIn)) {
    return res.redirect("/");
  }
  next();
};
