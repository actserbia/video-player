export default function linkVideo(videoSrc, ext, codac){
  var vidElement = document.createElement("video");
  vidElement.controls = true;
  document.body.appendChild(vidElement);
  if (window.MediaSource || !MediaSource.isTypeSupported('video/webm; codecs="vp8,vorbis"')) {
    var mediaSource = new MediaSource();
    vidElement.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    console.log("The Media Source Extensions API is not supported.")
  }
  var sourceBuffer;
  function sourceOpen(e) {
    URL.revokeObjectURL(vidElement.src);
    var mime = 'video/mp4;  codecs="avc1.64001E, mp4a.40.2"';
    var mediaSource = e.target;
    sourceBuffer = mediaSource.addSourceBuffer(mime);
    // var videoUrl = '/src/video/test_dashinit.mp4';
    var videoUrl = videoSrc;
    fetch(videoUrl)
      .then(function(response) {

        return response.arrayBuffer();
      })
      .then(function(arrayBuffer) {
        console.log(arrayBuffer);
        sourceBuffer.addEventListener('updateend', function(e) {
          console.log('updateend');
          if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
            console.log('endofstream');
            mediaSource.endOfStream();
            vidElement.play();
          }
        });
        sourceBuffer.appendBuffer(arrayBuffer);
      });
  }
  function endStream(){
    if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
      console.log('endofstream');
      // mediaSource.endOfStream();
      vidElement.play();
    } else {
      console.log("checking");
      console.log("not updating buffer", !sourceBuffer.updating);
      console.log("readyState", mediaSource.readyState);
      setTimeout(function(){
        endStream();
      }, 200);
    }
  }
}
