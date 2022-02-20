import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { anonOnly } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(anonOnly, getJoin).post(anonOnly, postJoin);
globalRouter.route("/login").get(anonOnly, getLogin).post(anonOnly, postLogin);
globalRouter.get("/search", search);

export default globalRouter;
