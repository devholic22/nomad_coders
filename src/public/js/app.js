// http에서의 url 접속 시 server.get("/") 처럼, ws에서의 접속으로 socket을 만들어낸다.
const socketWithBack = new WebSocket(`ws://${window.location.host}`);

// frontEnd webSocket이 backEnd와 연결되었다면 실행될 함수
socketWithBack.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socketWithBack.addEventListener("message", (message) => {
  console.log("Message from Server: ", message.data);
});

socketWithBack.addEventListener("close", () => {
  console.log("❌ Disconnected to Server");
});

setTimeout(() => {
  socketWithBack.send("hello from the browser");
}, 10000);
