/*
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
  // 프론트와 백엔드에서 쓰는 언어가 자바스크립트가 아닐 수도 있으므로 자바스크립트 오브젝트 말고 string 형태로 보내야 한다
};

const handleNickSubmit = (event) => {
  console.log("nick submit");
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socketWithBack.send(makeMessage("nickname", input.value));
  input.value = "";
};

const handleSubmit = (event) => {
  console.log("msg submit");
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socketWithBack.send(makeMessage("new_message", input.value));
  input.value = "";
};

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSubmit);
*/
const socketWithBack = io(); // 자동적으로 백엔드 socket.io와 연결해주는 function
// 알아서 socket.io를 실행하는 서버를 찾는다
const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socketWithBack.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
