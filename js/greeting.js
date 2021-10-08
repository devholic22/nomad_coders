const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#username");
const todo_input = document.querySelector("#todo_form");
const todoList = document.querySelector(".lists");

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
  todo_input.classList.remove("hidden");
  todoList.classList.remove("hidden");
}
const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", handleLoginInput);
} else {
  paintGreeting(savedUsername);
}
