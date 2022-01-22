import Video from "../models/Video.js";
import User from "../models/User.js";

// import { formatHashtags } from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  // console.log(video);
  // populate(relationship)은 video의 relationship을 실제 ref로 채워준다.
  // populate는 db에는 영향을 미치지 않는다.
  // const owner = await User.findById(video.owner);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "❌ Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "❌ Video not found." });
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id }
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // const video = await Video.findById(id);
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "❌ Video not found." });
  }
  if (video.owner._id.toString() !== String(_id)) {
    return res.status(403).redirect("/");
  }
  // findByIdAndUpdate를 위한 pre middleware는 없다.
  // findByIdAndUpdate는 findOneAndUpdate를 호출하는데
  // findOneAndUpdate를 위한 middleware는 있다.
  // 다만 findOneAndUpdate는 save hook을 호출하진 않는다.
  // 또한 findOneAndUpdate에서는 업데이트 하려는 문서에 접근을 할 수 없다.
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags)
  });
  /*
  video.title = title;
  video.description = description;
  video.hashtags = hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
  await video.save();
  */
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id }
  } = req.session;
  const { path: fileUrl } = req.file; // es6 구문인데 공부해야 할 듯하다.
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags)
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: `❌ ${error._message}`
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id }
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "❌ Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(keyword, "i") }
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};
