import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  location: { type: String },
  avatarUrl: { type: String, default: process.env.DEFAULT_AVATAR },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
});

userSchema.static("passwordHash", async function (password) {
  password = await bcrypt.hash(password, 5);
  return password;
});

const User = mongoose.model("User", userSchema);

export default User;
