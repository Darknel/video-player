const video = document.getElementById('video');
const play = document.getElementById('play');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
// Custom variable
const volume = document.getElementById('volume');
const volumeProgress = document.getElementById('volume-progress');
const screenSize = document.getElementById('screen-size');
const videoWrapper = document.getElementById('video-player');

// Custom screen size change
function changeSize() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

// Custom volume processbar
function changeVolume() {
  let v = this.value;
  video.volume = v / 100;
}

// Custom update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.style.backgroundImage = 'url(../img/play-button.svg)';
    play.style.backgroundPositionX = 60 + "%";
  } else {
    play.style.backgroundImage = 'url(../img/pause-button.svg)';
    play.style.backgroundPositionX = 50 + "%";
  }
}

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

// Custom listeners
volumeProgress.addEventListener('change', changeVolume);
progress.addEventListener('change', setVideoProgress);
screenSize.addEventListener('click', changeSize);
