const socketFromServer = new WebSocket(`ws://${window.location.host}`);

socketFromServer.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socketFromServer.addEventListener("message", (message) => {
  console.log(`✅ Server said "${message.data}"`);
});

socketFromServer.addEventListener("close", () => {
  console.log("❌ Disconnected to Server");
});
