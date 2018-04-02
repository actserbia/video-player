import './player-template.scss'
import seek from './seekbar'

export default function(videoDom) {
  // console.log(seekbar_container);
  videoDom.className = videoDom.className + " video-in-template";
  videoDom.controls = false;

  const seekbar = seek(videoDom);
  seekbar.init();

  const wrap = document.createElement("div");
  wrap.className = 'player-wrap';
  const template = `

    <div class='ad-video-bundler'>
      <div class='ad-container'></div>
    </div>

    <div class='control-bar'>
      <a class='play' href="#">play add</a>
      <a class='pause' href="#">pause</a>
      <a class='playv' href="#">play video</a>
      <input type="range" / class='video-controls__volumebar' min='0' max='1' step='0.1' value='1'>
      <button class="video-controls__fullscreen">Fullscreen</button>
    </div>

  `;

  wrap.insertAdjacentHTML("afterbegin", template);
  videoDom.insertAdjacentElement("afterend", wrap);

  wrap.getElementsByClassName('ad-video-bundler')[0].appendChild(videoDom);
  var el =   wrap.getElementsByClassName('play')[0];
  wrap.getElementsByClassName('control-bar')[0].insertBefore(seekbar, el);


  wrap.getElementsByClassName('playv')[0].addEventListener('click', function(){
    videoDom.play();
  });
  wrap.getElementsByClassName('pause')[0].addEventListener('click', function(){
    videoDom.pause();
  });
  var volumeBar = wrap.getElementsByClassName('video-controls__volumebar')[0],
      fullScreenButton = wrap.getElementsByClassName('video-controls__fullscreen')[0];

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
