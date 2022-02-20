import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: String, required: true },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true }
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
});

videoSchema.static("timeFormat", function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const result = `${year}. ${month}. ${day}`;
  return result;
});

videoSchema.static("hashtagFormat", function (hashtags) {
  if (hashtags.length == 0) {
    return null;
  } else {
    return hashtags
      .split(",")
      .map((hashtag) =>
        hashtag.trim().startsWith("#")
          ? hashtag.trim().toUpperCase()
          : `#${hashtag.trim().toUpperCase()}`
      );
  }
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
