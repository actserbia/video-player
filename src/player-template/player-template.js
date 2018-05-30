import './player-template.scss'
import seek from './seekbar'

export default function(videoDom) {

  videoDom.className = videoDom.className + " video-in-template";
  videoDom.controls = false;

  //  T E M P L A T I N G

  const wrap = document.createElement("div");
  wrap.className = 'player-wrap';
  const template = `
  <img src='/src/player-template/img/loading.gif' class='loading-ico'></img>
  <div class='ad-video-bundler'>
    <div class='ad-container'></div>
  </div>
  <div class='control-bar'>
    <a class='play' href="#">play add</a>
    <a class='pause' href="#">pause</a>
    <a class='playv' href="#">play video</a>
    <input type="range" / class='video-controls__volumebar' min='0' max='1' step='0.1' value='1'>
    <a class="video-controls__fullscreen" href="#">Fullscreen</a>
    <span class="languages"></span>
    <span class="resolutions"></span>
  </div>
  `;
  // template --> wrap
  wrap.insertAdjacentHTML("afterbegin", template);
  // wrap beside <video>
  videoDom.insertAdjacentElement("afterend", wrap);
  // <video> --> wrap
  wrap.getElementsByClassName('ad-video-bundler')[0].appendChild(videoDom);
  // SeekBar
  wrap.getElementsByClassName('control-bar')[0].insertAdjacentElement("afterbegin", seek(videoDom));



  //  B I N D I N G S

  videoDom.loading_ico = wrap.getElementsByClassName('loading-ico')[0];

  wrap.getElementsByClassName('playv')[0].addEventListener('click', function(ev){
    ev.preventDefault();
    videoDom.play();
  });
  wrap.getElementsByClassName('pause')[0].addEventListener('click', function(ev){
    ev.preventDefault();
    videoDom.pause();
  });


  var volumeBar = wrap.getElementsByClassName('video-controls__volumebar')[0],
  fullScreenButton = wrap.getElementsByClassName('video-controls__fullscreen')[0];

  videoDom.addEventListener("timeupdate", function() {
    //console.log("updating time");
    clearTimeout(timeout);
    videoDom.loading_ico.style.display = "none";

  });
  videoDom.addEventListener("playing", function() {
    //console.log("playing");
    videoDom.loading_ico.style.display = "none";
  });
  videoDom.addEventListener("paused", function() {
    //console.log("paused");
    videoDom.loading_ico.style.display = "none";
  });


  var timeout;
  videoDom.addEventListener("stalled", function() {
    if(videoDom.played.length != 0){
      timeout = setTimeout(function(){
        videoDom.loading_ico.style.display = "block";
        //console.log("stalling");
      }, 150)
    }
  });

  videoDom.addEventListener("waiting", function() {
    //console.log("waiting");
    videoDom.loading_ico.style.display = "block";
  });

  // Event listener for the full-screen button
  fullScreenButton.addEventListener("click", function() {
    if (videoDom.requestFullscreen) {
      videoDom.requestFullscreen();
    } else if (videoDom.mozRequestFullScreen) {
      videoDom.mozRequestFullScreen(); // Firefox
    } else if (videoDom.webkitRequestFullscreen) {
      videoDom.webkitRequestFullscreen(); // Chrome and Safari
    }
  });

  // Event listener for the volume bar
  volumeBar.addEventListener("change", function() {
    // Update the video volume
    videoDom.volume = volumeBar.value;
  });

  return wrap;

}
