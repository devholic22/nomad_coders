const user = document.querySelector("#greeting h1");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form_text");
const loginBtn = document.querySelector("#login-form_btn");

function handleLoginInput(event) {
  event.preventDefault();
  saveUser();
  loginForm.classList.add("hidden");
}
function saveUser() {
  user.innerText = `Hello ${loginInput.value}`;
  localStorage.setItem("user", loginInput.value);
}
loginBtn.addEventListener("click", handleLoginInput);
