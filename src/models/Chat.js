import mongoose from "mongoose";

const chatSchemea = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ownUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: { type: String, required: true },
  createdAt: { type: String, required: true },
  room: { type: String, required: true },
  read: { type: Boolean, enum: [true, false], default: false, required: true }
});

chatSchemea.static("timeFormat", () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  const result = `${year}/${month}/${day} ${hour}:${min}`;

  return result;
});

chatSchemea.static("roomFormat", (id1, id2) => {
  const sortRoom = [id1, id2].sort();
  let sortRoomId = "";
  sortRoom.forEach((id) => (sortRoomId += id));
  return sortRoomId;
});

const Chat = mongoose.model("Chat", chatSchemea);

export default Chat;
