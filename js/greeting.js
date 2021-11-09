const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#username");
const todoFormHidden = document.querySelector("#todo_form");
const todoList = document.querySelector(".todo_list");

function handleLoginInput(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add("hidden");
  localStorage.setItem("username", username);
  paintGreeting(username);
}

function paintGreeting(username) {
  greeting.innerText = `Hello, ${username}`;
  greeting.classList.remove("hidden");
  paintList();
}
function paintList() {
  todoFormHidden.classList.remove("hidden");
  todoList.classList.remove("hidden");
}
const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", handleLoginInput);
} else {
  paintGreeting(savedUsername);
}
