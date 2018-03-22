export default function linkVideo(flavors, video){

  //videoSrc, ext, codac
  flavors.forEach( flavor => {
    let btn = document.createElement('button');
    btn.innerHTML = flavor.vid+flavor.mime;
    btn.addEventListener("click", function(){
      tryFlavor(flavor, video)
    });
    // btn.onclick = tryFlavor(flavor, video)
    video.insertAdjacentElement( 'afterend', btn );
    // let sw = flavor.fileExt+"-"+flavor.videoCodecId;
    // console.log(sw)




  });
  function tryFlavor(flavor, video){
    if (window.MediaSource && MediaSource.isTypeSupported(flavor.mime)) {
      let vidElement = video;
      vidElement.controls = true;
      document.getElementsByClassName('container')[0].insertAdjacentHTML( 'beforeend', flavor.mime );
      // document.getElementsByClassName('container')[0].appendChild(vidElement);
      let mediaSource = new MediaSource();
      vidElement.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener(  'sourceopen', function(e){
        sourceOpen({e:e, flavor: flavor, vEl: vidElement})
      }
    );
    } else {
      console.log("The Media Source Extensions API is not supported.")
    }
  }
  function sourceOpen(data) {
    var sourceBuffer;
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
        sourceBuffer.addEventListener('updateend', function(e) {
          if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
            mediaSource.endOfStream();
            vidElement.play();
          }
        });
        sourceBuffer.appendBuffer(arrayBuffer);
      });
  }
}
