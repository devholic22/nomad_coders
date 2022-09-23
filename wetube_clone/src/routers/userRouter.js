import express from "express";
import {
  logout,
  getEditProfile,
  postEditProfile,
  changePassword,
  deleteUser,
  userProfile
} from "../controllers/userController";
import { loggedInOnly, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loggedInOnly, logout);
userRouter
  .route("/edit")
  .get(loggedInOnly, getEditProfile)
  .post(loggedInOnly, avatarUpload.single("avatar"), postEditProfile);
userRouter.post("/change-password", loggedInOnly, changePassword);
userRouter.post("/delete", loggedInOnly, deleteUser);
userRouter.get("/:username", userProfile);

export default userRouter;
