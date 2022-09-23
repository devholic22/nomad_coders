import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo
} from "../controllers/videoController";
import { loggedInOnly, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(loggedInOnly, getUpload)
  .post(loggedInOnly, videoUpload.single("video"), postUpload);
videoRouter.get("/:id", watch);
videoRouter
  .route("/:id/edit")
  .get(loggedInOnly, getEdit)
  .post(loggedInOnly, postEdit);
videoRouter.get("/:id/delete", loggedInOnly, deleteVideo);

export default videoRouter;
