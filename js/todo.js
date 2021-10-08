const todoForm = document.querySelector("#todo_form");
const todoInput = todoForm.querySelector("input");

const prepare = document.querySelector("#prepare");
const progressing = document.querySelector("#progressing");
const done = document.querySelector("#done");

function savePrepare(newTodo) {
  const li = document.createElement("li");
  li.innerText = newTodo;
  prepare.appendChild(li);
}

function handletoDoForm(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  savePrepare(newTodo);
}
todoForm.addEventListener("submit", handletoDoForm);
