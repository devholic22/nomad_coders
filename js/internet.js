const wifi = document.querySelector(".internet");
const internet = navigator.onLine;
if (internet === true) {
  wifi.style.color = "black";
} else {
  wifi.style.color = "red";
}
