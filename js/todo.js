const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input[type=text]");
const toDoList = document.querySelector("#todo-list");

function handleToDoSubmit(event) {
  event.preventDefault();
  newTodo = toDoInput.value;
  console.log(newTodo);
  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);
