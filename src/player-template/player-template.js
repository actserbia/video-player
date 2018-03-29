require('./player-template.scss')
export default function(videoDom) {
  videoDom.className = videoDom.className + " video-in-template";
  videoDom.controls = false;
  const wrap = document.createElement("div");
  console.log("called for template");
  wrap.className = 'player-wrap';
  const template = `

    <div class='ad-container'></div>

    <div class='control-bar'>
      <a class='play' href="#">play add</a>
      <a class='pause' href="#">pause</a>
      <a class='playv' href="#">play video</a>
      <input type="range" / class='video-controls__seekbar' value='0'>
      <input type="range" / class='video-controls__volumebar' min='0' max='1' step='0.1' value='1'>
      <button class="video-controls__fullscreen">Fullscreen</button>
    </div>
  `;


  wrap.insertAdjacentHTML("afterbegin", template);
  // videoDom.insertAdjacentHTML("afterend", videoControls);
  videoDom.insertAdjacentElement("afterend", wrap);
  wrap.appendChild(videoDom);


  wrap.getElementsByClassName('playv')[0].addEventListener('click', function(){
    videoDom.play();
  });
  wrap.getElementsByClassName('pause')[0].addEventListener('click', function(){
    videoDom.pause();
  });
  var seekBar = wrap.getElementsByClassName('video-controls__seekbar')[0],
      volumeBar = wrap.getElementsByClassName('video-controls__volumebar')[0],
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
    // Event listener for the seek bar
  seekBar.addEventListener("change", function() {
    // Calculate the new time
    var time = videoDom.duration * (seekBar.value / 100);

    // Update the video time
    videoDom.currentTime = time;
  });
    // Update the seek bar as the video plays
  videoDom.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / videoDom.duration) * videoDom.currentTime;

    // Update the slider value
    seekBar.value = value;
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
