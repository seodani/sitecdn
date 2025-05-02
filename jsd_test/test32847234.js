const audio = document.getElementById('audio');
  const progress = document.getElementById('progress');
  const timeDisplay = document.getElementById('time-display');
  const progressContainer = document.querySelector('.progress-container');

  function getAudioFileFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const file = params.get('audio');
    if (!file) {
      alert("오디오 파일이 지정되지 않았습니다. URL에 ?audio=파일명을 추가하세요.");
      return;
    }
    audio.src = decodeURIComponent(file);
  }

  window.addEventListener('DOMContentLoaded', () => {
    getAudioFileFromQuery();

    audio.addEventListener('error', () => {
      alert("오디오 파일을 불러올 수 없습니다. 파일 경로를 확인하세요.");
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
  });

  function playAudio() {
    audio.play();
  }

  function pauseAudio() {
    audio.pause();
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
  }

  function skip(seconds) {
    audio.currentTime += seconds;
  }

  function updateProgress() {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = percent + "%";

      timeDisplay.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    }
  }

  function seek(event) {
    const rect = progressContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * audio.duration;
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
  }