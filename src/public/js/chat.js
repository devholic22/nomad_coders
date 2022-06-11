const socketWithBack = io();
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");

const fromUserId = document.querySelector(".fromUserId").innerText.substring(5);
const toUserId = window.location.href.substring(22);

function addFromMessage(message) {
  const li = document.createElement("li");
  li.innerText = message;
  li.classList.add("fromMsg");
  chatList.append(li);
}

function addToMessage(message) {
  const li = document.createElement("li");
  li.innerText = message;
  li.classList.add("toMsg");
  chatList.append(li);
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

chatForm.addEventListener("submit", handleMessage);
