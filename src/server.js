import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  // console.log(req);
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

// session.id는 session object 안에서 sessionID를 쓰고 싶은 사람들을 위해 만들어진 속성이다.
// 따라서 session.id와 sessionID의 값은 동일하다.
// 쿠키는 session object 안에 포함되어 있다.
// 쿠키는 session ID를 받기 위한 매개체이다.
// 세션은 서버에서 제공해주는 데이터이고, 쿠키는 서버에서 브라우저에게 제공한 식별을 위해 사용되는 데이터이다.
// req.sessionStore에서 처음 한 번 undefined 나온 이유는
// 서버 측에서 클라이언트 (브라우저)에게 세션을 제공했던 적이 없기 때문이다.
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
