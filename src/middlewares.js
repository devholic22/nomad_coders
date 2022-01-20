import multer from "multer";

// request에 있는 user를 response의 locals object에 담는 middleware
// res.locals는 어느 view 에서든 사용할 수 있다.
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  // console.log(res.locals);
  next();
};

// 로그인 되지 않았을 때, url들을 방문할 수 없도록 보호하는 middleware
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인 되지 않은 사람들만 접속 가능하도록 하는 middleware
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// 파일 업로드 관련 middleware
export const uploadFiles = multer({ dest: "uploads/" });
