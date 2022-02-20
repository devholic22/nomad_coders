const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comment = form.querySelector("input[type=text]");

const handleSubmit = (event) => {
  event.preventDefault();
  const text = comment.value;
  const video = videoContainer.dataset.id;
};
form.addEventListener("submit", handleSubmit);
