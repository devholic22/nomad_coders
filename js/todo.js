const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_form input");
const prepareList = document.querySelector("#prepare");

let toDoArray = [];

function saveArray(todo) {
  toDoArray.push(todo);
  localStorage.setItem("todo", JSON.stringify(toDoArray));
}

function paintTodo(value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = value;
  li.appendChild(span);
  prepareList.appendChild(li);
}

function handleTodoForm(event) {
  event.preventDefault();
  const value = todoInput.value;
  todoInput.value = "";
  saveArray(value);
  paintTodo(value);
}

todoForm.addEventListener("submit", handleTodoForm);

const existStorage = localStorage.getItem("todo");
const parsedStorage = JSON.parse(existStorage);

if (localStorage.getItem("todo") !== null) {
  toDoArray = parsedStorage;
  parsedStorage.forEach(paintTodo);
}
