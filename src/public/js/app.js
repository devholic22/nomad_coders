const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socketWithBack = new WebSocket(`ws://${window.location.host}`);

// open event
socketWithBack.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

// message event
socketWithBack.addEventListener("message", (message) => {
  // console.log("New message: ", message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

// close event
socketWithBack.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

// send message
// setTimeout(() => {
//  socketWithBack.send("hello from the browser!");
// }, 10000);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socketWithBack.send(makeMessage("nick", input.value));
  input.value = "";
};

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socketWithBack.send(makeMessage("new_message", input.value));
  input.value = "";
};

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSubmit);
