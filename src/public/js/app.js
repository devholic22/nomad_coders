const frontSocket = new WebSocket(`ws://${window.location.host}`);

frontSocket.addEventListener("open", () => {
  console.log("✅ Connected to the Server");
});

frontSocket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

frontSocket.addEventListener("close", () => {
  console.log("❌ Disconnected from the Server");
});

setTimeout(() => {
  frontSocket.send("hello from the browser.");
}, 5000);
