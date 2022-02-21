const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
  event.preventDefault();
  const comment = form.querySelector("input[type=text]");
  const text = comment.value;
  const videoId = videoContainer.dataset.id;
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: {
      text
    }
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
