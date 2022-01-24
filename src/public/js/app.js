const frontSocket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("✅ Connected to the Server");
}

function onSocketMessage(message) {
  console.log("New message: ", message.data);
}

function handleClose() {
  console.log("❌ Disconnected from the Server");
}

frontSocket.addEventListener("open", handleOpen);

frontSocket.addEventListener("message", onSocketMessage);

frontSocket.addEventListener("close", handleClose);

setTimeout(() => {
  frontSocket.send("hello from the browser.");
}, 5000);
