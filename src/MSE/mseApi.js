export default function linkVideo(videoSrc){
  var vidElement = document.getElementById('video1');
  if (window.MediaSource) {
    var mediaSource = new MediaSource();
    vidElement.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    console.log("The Media Source Extensions API is not supported.")
  }
  function sourceOpen(e) {
    URL.revokeObjectURL(vidElement.src);
    var mime = 'video/webm; codecs="opus, vp9"';
    var mediaSource = e.target;
    var sourceBuffer = mediaSource.addSourceBuffer(mime);
    var videoUrl = videoSrc;
    fetch(videoUrl)
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(function(arrayBuffer) {
        sourceBuffer.addEventListener('updateend', function(e) {
          if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
            mediaSource.endOfStream();
          }
        });
        sourceBuffer.appendBuffer(arrayBuffer);
      });
  }
}
