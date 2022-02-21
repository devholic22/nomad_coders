import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  console.log("watch", id);
  if (id.length == 24) {
    const video = await Video.findById(id).populate("owner");
    // const owner = await User.findById(video.owner);
    if (!video) {
      return res.status(404).render("error", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle: video.title, video });
  }
  return res.status(404).render("error", { pageTitle: "Video not found." });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id }
  } = req.session;

  if (id.length == 24) {
    const video = await Video.findById(id).populate("owner");
    if (!video || String(_id) != String(video.owner._id)) {
      return res.redirect("/");
    }
    return res.render("edit", {
      pageTitle: `✂️ Editing: ${video.title}`,
      video
    });
  }
  return res.redirect("/");
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.hashtagFormat(hashtags)
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "📹 Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id }
  } = req.session;
  const file = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: file.path,
      createdAt: Video.timeFormat(),
      hashtags: Video.hashtagFormat(hashtags),
      meta: {
        views: 0,
        rating: 0
      },
      owner: _id
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "📹 Upload Video",
      errorMsg: `⚠️ ${error._message}`
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id }
  } = req.session;
  const video = await Video.findById(id).populate("owner");
  if (String(video.owner._id) != String(_id)) {
    return res.status(400).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  let videos = [];
  const { value } = req.query;

  // 1. title
  const findByTitle = await Video.find({
    title: {
      $regex: new RegExp(`(${value})`, "i")
    }
  }).populate("owner");
  if (findByTitle) {
    videos = videos.concat(findByTitle);
  }

  // 2. description (developing...)
  const findByDesc = await Video.find({
    description: {
      $regex: new RegExp(`(${value})`, "i")
    }
  });
  if (findByDesc) {
    const sortedTitle = videos.map((video) => {
      JSON.stringify(video);
      // console.log(JSON.stringify(video));
      // console.log(JSON.parse(JSON.stringify(video)));
    });
  }

  // 3. Hashtags... (developing...)

  return res.render("search", { pageTitle: "🔎 Search Videos", videos, value });
};

export const createComment = (req, res) => {
  console.log(req.params);
  console.log(req.body);
};
