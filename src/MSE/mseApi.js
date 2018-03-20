export default function linkVideo(flavors){

  //videoSrc, ext, codac
  flavors.forEach( flavor => {
    let sw = flavor.fileExt+"-"+flavor.videoCodecId;
    console.log(sw)

    switch (sw) {
      case 'webm-v_vp8' :
        flavor.mime = 'video/webm; codecs="vp8,vorbis"'
        break;
      case 'mp4-avc1' :
        flavor.mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        break;
      case '3gp-mpeg-4 visual' :
        flavor.mime = 'video/3gpp; codecs="mp4v.20.8, samr"'
        break;
      case 'mp4-undefined' :
        flavor.mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        break;
    }


    if (window.MediaSource && MediaSource.isTypeSupported(flavor.mime)) {
      var vidElement = document.createElement("video");
      vidElement.controls = true;
      document.getElementsByClassName('container')[0].insertAdjacentHTML( 'beforeend', flavor.mime );
      document.getElementsByClassName('container')[0].appendChild(vidElement);
      var mediaSource = new MediaSource();
      vidElement.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener(  'sourceopen', function(e){
        sourceOpen({e:e, flavor: flavor, vEl: vidElement})
      }
    );
    } else {
      console.log("The Media Source Extensions API is not supported.")
    }
  });




  var sourceBuffer;
  function sourceOpen(data) {
    var mime = data.flavor.mime;
    var videoSrc = data.flavor.url;
    var vidElement = data.vEl;
    var e = data.e;
    URL.revokeObjectURL(vidElement.src);
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
