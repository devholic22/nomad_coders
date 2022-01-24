const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const frontSocket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("✅ Connected to the Server");
}

function onSocketMessage(message) {
  console.log(message.data);
}

function handleClose() {
  console.log("❌ Disconnected from the Server");
}

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  frontSocket.send(input.value);
  input.value = "";
}

frontSocket.addEventListener("open", handleOpen);

frontSocket.addEventListener("message", onSocketMessage);

frontSocket.addEventListener("close", handleClose);

messageForm.addEventListener("submit", handleSubmit);
