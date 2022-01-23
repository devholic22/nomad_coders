const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  if (video.volume === 0) {
    video.volume = 0.1;
    volumeValue = 0.1;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value }
  } = event;
  volumeValue = Number(value);
  video.volume = Number(value);
  if (Number(value) === 0) {
    video.muted = true;
  } else {
    video.muted = false;
  }
  muteBtn.innerText = Number(value) === 0 ? "Unmute" : "Mute";
};

const handleLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);

// JS에서 eventlistener를 추가하기 전에 video가 로딩이 되어
// handleLoadedMetadate()가 아예 안 불러질 수 있으므로 아래 코드 추가
if (video.readyState == 4) {
  handleLoadedMetadata();
}
