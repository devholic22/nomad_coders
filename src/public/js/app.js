const socketWithBack = new WebSocket(`ws://${window.location.host}`);

// open event
socketWithBack.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

// message event
socketWithBack.addEventListener("message", (message) => {
  console.log("Just got this: ", message.data, "from the server");
});

// close event
socketWithBack.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

// send message
setTimeout(() => {
  socketWithBack.send("hello from the browser!");
}, 10000);
