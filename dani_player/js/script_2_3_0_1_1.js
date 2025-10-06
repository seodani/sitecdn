async function getVideoURLFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    return videoUrl || '';
  }

  async function playVideo() {
    const video = document.getElementById('video');
    const url = await getVideoURLFromQuery();

    if (!url) {
      console.error("No video URL provided.");
      return;
    }

    if (url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        alert("HLS is not supported in this browser.");
      }
    } else if (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.mkv') || url.endsWith('.webm') || url.endsWith(".php")) {
      try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: 'video/mp4' });
        const blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
      } catch (err) {
        console.error("Failed to download video:", err);
      }
    } else {
      console.error("Unsupported video format.");
    }
  }

  playVideo();