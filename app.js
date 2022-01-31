const loginInput = document.querySelector("#login-form input[type=text]");
const loginButton = document.querySelector("#login-form input[type=submit]");

function onLoginBtnClick() {
  const username = loginInput.value;
  console.log(username);
}

loginButton.addEventListener("click", onLoginBtnClick);
