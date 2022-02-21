const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const comment = form.querySelector("input[type=text]");
  const text = comment.value;
  const videoId = videoContainer.dataset.id;
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });
  comment.value = "";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
