const socketWithBack = io();
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");

const fromUserId = document.querySelector(".fromUserId").innerText.substring(5);
const toUserId = window.location.href.substring(22);

// 받는 메시지
function addFromMessage(message) {
  const li = document.createElement("li");
  li.innerText = message;
  li.classList.add("fromMsg");
  chatList.append(li);
  chatList.scrollTop = chatList.scrollHeight;
}

// 보내는 메시지
function addToMessage(message) {
  const div = document.createElement("div");
  div.classList.add("msgDiv");
  const span = document.createElement("span");
  span.innerText = "1";
  const li = document.createElement("li");
  li.innerText = message;
  li.classList.add("toMsg");
  div.append(span);
  div.append(li);
  chatList.append(div);
  chatList.scrollTop = chatList.scrollHeight;
}

// 입장 -> 모든 메시지 읽음 처리 ("나"가 아니라, "상대방"이 접속해야 읽음 처리 됨)
function readMessage() {
  console.log("메시지 모두 읽음");
  const spans = document.querySelectorAll("span");
  // spans.forEach((span) => console.log(span));
  spans.forEach((span) => span.classList.add("none"));
}

async function handleMessage(event) {
  event.preventDefault();
  const input = chatForm.querySelector(".chatText");
  const value = input.value;
  socketWithBack.emit(
    "new_message",
    sortId(fromUserId, toUserId),
    value,
    () => {
      addToMessage(`${value}`);
    }
  );
  input.value = "";
  await fetch(`/${toUserId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ value })
  });
}

function sortId(id1, id2) {
  let result = "";
  [id1, id2].sort().forEach((id) => (result += id));
  console.log(result);
  return result;
}

socketWithBack.on("new_message", addFromMessage);
socketWithBack.emit("visit", sortId(fromUserId, toUserId));
socketWithBack.on("test", (test) => {
  console.log(test);
});

chatForm.addEventListener("submit", handleMessage);
