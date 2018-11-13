import './player-template.scss'
import seek from './seekbar'
import trigger from '../libs/trigger.js'

import loadingGif from './img/loading.gif'
import playSvg from './img/play-button.svg'
import pauseSvg from './img/pause-button.svg'


export default function(videoBundler) {

  let videoDom = videoBundler.getElementsByTagName('video')[0];

  videoDom.className = videoDom.className + " video-in-template";
  videoDom.controls = false;

  let duration = false;

  //  T E M P L A T I N G

  const wrap = document.createElement("div");
  wrap.className = 'player-wrap';
  const template = `

    <img src=${loadingGif} class='loading-ico'></img>
    <a class='play-big' href="#">${playSvg}</a>

    <div class='control-bar'>
      <input type="range" / class='video-controls__volumebar' min='0' max='1' step='0.1' value='1'>
      <a class="video-controls__fullscreen" href="#">Fullscreen</a>
      <span class="languages"></span>
      <span class="resolutions"></span>
      <div class="control-bar--bottom">
        <a class='pause-button' href="#">${pauseSvg}</a>
        <a class='play-button' href="#">${playSvg}</a>
        <span class="time-watch"></span>
      </div>
    </div>

  `;
  // template --> wrap
  wrap.insertAdjacentHTML("afterbegin", template);
  // SeekBar
  wrap.getElementsByClassName('time-watch')[0].insertAdjacentElement("beforebegin", seek(videoDom));
  // wrap beside <video>
  videoDom.insertAdjacentElement("afterend", wrap);
  // <video> --> wrap
  wrap.appendChild(videoDom);


  let printTime = function(current = videoDom.currentTime) {
    let el = wrap.getElementsByClassName('time-watch')[0];
    let durationM = Math.floor( duration / 60 );
    let durationS = String(Math.floor(duration - (durationM * 60)));
    durationS = (durationS.length===1) ? "0"+durationS : durationS;
    let currentM = Math.floor( current / 60 );
    let currentS = String(Math.floor(current - (currentM * 60)));
    currentS = (currentS.length===1) ? "0"+currentS : currentS;
    let time = `${currentM}:${currentS} / ${durationM}:${durationS}`;
    el.innerHTML = time;
  }



  //  B I N D I N G S

  videoDom.loading_ico = wrap.getElementsByClassName('loading-ico')[0];

  // Handling the PLAY
  var adInitialized = false;
  let playHandler = function() {
    if(adInitialized) {
      videoDom.play();
    }
    else {
      trigger(videoDom, 'playButtonClick');
      adInitialized = true;
    }
  }
  wrap.getElementsByClassName('play-button')[0].addEventListener('click', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    playHandler();
  });
  wrap.getElementsByClassName('control-bar')[0].addEventListener('click', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    playHandler();
  });



  // Event listener for the PAUSE
  wrap.getElementsByClassName('pause-button')[0].addEventListener('click', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    videoDom.pause();
  });


  var volumeBar = wrap.getElementsByClassName('video-controls__volumebar')[0],
  fullScreenButton = wrap.getElementsByClassName('video-controls__fullscreen')[0];

  videoDom.addEventListener('loadedmetadata', function() {
    duration = videoDom.duration;
    printTime();
  });

  videoDom.addEventListener("timeupdate", function() {
    //console.log("updating time");
    clearTimeout(timeout);
    videoDom.loading_ico.style.display = "none";

    printTime();

  });

  videoDom.addEventListener("playing", function() {
    //console.log("playing");
    wrap.classList.add('video-playing');
    videoDom.loading_ico.style.display = "none";
  });

  videoDom.addEventListener("pause", function() {
    console.log("paused");
    wrap.classList.remove('video-playing');
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
    ev.preventDefault();
    ev.stopPropagation();
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
