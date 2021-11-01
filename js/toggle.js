const downToggle = document.querySelector(".down-toggle");
const friend = document.getElementById("home-friend");

function handleDown() {
  downToggle.classList.value = "fas fa-chevron-down .down-toggle";
  friend.classList.add("hidden");
}

function handleUp() {
  downToggle.classList.value = "fas fa-chevron-up .down-toggle";
  friend.classList.remove("hidden");
}

function handleToggle() {
  if (downToggle.classList.value === "fas fa-chevron-down .down-toggle") {
    handleUp();
  } else {
    handleDown();
  }
}

downToggle.addEventListener("click", handleToggle);
