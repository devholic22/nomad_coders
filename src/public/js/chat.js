const socketWithBack = io();
const chatList = document.getElementById("chatList");
const chatForm = document.getElementById("chatForm");

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
  socketWithBack.emit("new_message", value, () => {
    addToMessage(`${value}`);
  });
  const id = window.location.href.substring(22);
  input.value = "";
  await fetch(`/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ value })
  });
}

socketWithBack.on("new_message", addFromMessage);

const id = window.location.href.substring(22);
socketWithBack.emit("visit", id);

// socketWithBack.on("enter_room", console.log);

chatForm.addEventListener("submit", handleMessage);
