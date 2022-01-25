import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  name: { type: String, required: true },
  password: { type: String },
  tasks: [{ type: String, trim: true }]
});

const User = mongoose.model("User", userSchema);

export default User;
