import express from "express";
import User from "../models/User";
import Chat from "../models/Chat";
import { preventSelf, preventAnon } from "../middleware";
import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout
} from "../controller/userController";

const globalRouter = express.Router();

const home = async (req, res) => {
  if (req.session.user) {
    const allUsers = (await User.find({})).filter(
      (user) => String(user.id) != String(req.session.user._id)
    );
    return res.render("home", { allUsers });
  }
  return res.render("home");
};

const chatRoom = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const loggedInUser = req.session.user;
  const room = idSort(userId, String(loggedInUser._id));
  // console.log(room);
  // console.log(await Chat.find({}));
  const chats = await Chat.find({ room }).populate("ownUser");
  // console.log(req.session.user); // 로그인 된 유저
  // console.log(user); // 유저
  return res.render("chat", { user, loggedInUser, chats });
};

const postChat = async (req, res) => {
  const { userId } = req.params;
  const { value } = req.body;
  const fromUser = req.session.user; // 보내는 유저
  const toUser = await User.findById(userId); // 받는 유저
  await Chat.create({
    fromUser,
    toUser,
    ownUser: fromUser,
    text: value,
    createdAt: Chat.timeFormat(),
    room: Chat.roomFormat(String(fromUser._id), String(toUser.id))
  });
};

const idSort = (id1, id2) => {
  const sortId = [id1, id2].sort();
  let result = "";
  sortId.forEach((id) => (result += id));
  return result;
};

globalRouter.get("/", home);
globalRouter.post("/logout", logout);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/register").get(getRegister).post(postRegister);
globalRouter.get("/:userId", preventAnon, preventSelf, chatRoom);
globalRouter.post("/:userId", preventAnon, preventSelf, postChat);

export default globalRouter;
