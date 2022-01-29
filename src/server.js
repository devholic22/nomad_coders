import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import { localsMiddleware } from "./middlewares.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // secret: 쿠키에 sign (서버가 줬다는 걸 보여주기 위해 -> session 납치 방지) 할 때 사용하는 string
    resave: false, // resave: 모든 request마다 세s션의 변경사항에 상관 없이 세션을 저장한다. 이는 익명 사용자도 저장하므로 좋지 않다.
    saveUninitialized: false, // saveUninitialized: 아무 내용이 없는 session을 (초기화되지 않은) 저장하는지 결정한다.
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
  })
);

/*
app.use((req, res, next) => {
  // console.log(req);
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});
*/

// session.id는 session object 안에서 sessionID를 쓰고 싶은 사람들을 위해 만들어진 속성이다.
// 따라서 session.id와 sessionID의 값은 동일하다.
// 쿠키는 session object 안에 포함되어 있다.
// 쿠키는 session ID를 받기 위한 매개체이다.
// 세션은 서버에서 제공해주는 데이터이고, 쿠키는 서버에서 브라우저에게 제공한 식별을 위해 사용되는 데이터이다.
// req.sessionStore에서 처음 한 번 undefined 나온 이유는
// 서버 측에서 클라이언트 (브라우저)에게 세션을 제공했던 적이 없기 때문이다.

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // 브라우저에게 폴더를 노출시킨다.
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
