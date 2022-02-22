const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
// http에서의 url 접속 시 server.get("/") 처럼, ws에서의 접속으로 socket을 만들어낸다.
const socketWithBack = new WebSocket(`ws://${window.location.host}`);

// frontEnd webSocket이 backEnd와 연결되었다면 실행될 함수
socketWithBack.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socketWithBack.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.appendChild(li);
});

socketWithBack.addEventListener("close", () => {
  console.log("❌ Disconnected to Server");
});

const makeMessage = (type, content) => {
  const message = { type, content };
  return JSON.stringify(message);
};

const handleSubmitNickname = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socketWithBack.send(makeMessage("nickname", input.value));
  input.value = "";
};

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socketWithBack.send(input.value);
  input.value = "";
};

nicknameForm.addEventListener("submit", handleSubmitNickname);
messageForm.addEventListener("submit", handleSubmit);
/*
setTimeout(() => {
  socketWithBack.send("hello from the browser");
}, 10000);
*/
