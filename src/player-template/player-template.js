// import './player-template.scss'
import seek from './seekbar'

export default function(videoDom) {
  // console.log(seekbar_container);
  videoDom.className = videoDom.className + " video-in-template";
  videoDom.controls = false;

  const seekbar = seek();
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
  videoDom.insertAdjacentElement("afterend", seekbar);


  wrap.getElementsByClassName('playv')[0].addEventListener('click', function(e){
    videoDom.play();
    e.preventDefault();
  });
  wrap.getElementsByClassName('pause')[0].addEventListener('click', function(e){
    videoDom.pause();
    e.preventDefault();
  });
  var volumeBar = wrap.getElementsByClassName('video-controls__volumebar')[0],
      fullScreenButton = wrap.getElementsByClassName('video-controls__fullscreen')[0];

    // Event listener for the full-screen button
  fullScreenButton.addEventListener("click", function(e) {
    if (videoDom.requestFullscreen) {
      videoDom.requestFullscreen();
    } else if (videoDom.mozRequestFullScreen) {
      videoDom.mozRequestFullScreen(); // Firefox
    } else if (videoDom.webkitRequestFullscreen) {
      videoDom.webkitRequestFullscreen(); // Chrome and Safari
    }
    e.preventDefault();
  });

  seekbar.addEventListener("click", function(e){
    var cx = e.clientX - seekbar.offsetLeft;

    // console.log(cx);
    // console.log(seek.offsetWidth );
    var percent =   cx / seekbar.offsetWidth * 100;
    seekbar.value = percent;
    videoDom.currentTime = videoDom.duration * percent / 100;
    seekbar.update();
  });
    // Update the seek bar as the video plays
  videoDom.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / videoDom.duration) * videoDom.currentTime;
    var bufferValue = (100 / videoDom.duration) * videoDom.shaka.getBufferedInfo().total[0].end;
    // Update the slider value

    seekbar.value = value;
    seekbar.bufferValue = bufferValue;



    seekbar.update();
    // console.log(seekbar.value);
  });
  //   // Pause the video when the slider handle is being dragged
  // seekBar.addEventListener("mousedown", function() {
  //   videoDom.pause();
  // });
  //
  // // Play the video when the slider handle is dropped
  // seekBar.addEventListener("mouseup", function() {
  //   videoDom.play();
  // });
  // Event listener for the volume bar
  volumeBar.addEventListener("change", function() {
    // Update the video volume
    videoDom.volume = volumeBar.value;
  });

  return wrap;

}
