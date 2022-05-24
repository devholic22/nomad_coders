const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socketWithBack = new WebSocket(`ws://${window.location.host}`);

// open event
socketWithBack.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

// message event
socketWithBack.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

// close event
socketWithBack.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

// send message
// setTimeout(() => {
//  socketWithBack.send("hello from the browser!");
// }, 10000);

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socketWithBack.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
