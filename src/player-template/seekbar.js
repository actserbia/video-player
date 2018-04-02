import './seekbar.scss'

export default function seekbar_container(videoDom){
  const seek = document.createElement('div');
  // console.log("seeking",seek);
  seek.className = 'seekbar__container';

  let template = `
  <div class="seekbar__line"></div>
  <div class="seekbar__handle"></div>
  <div class="seekbar__buffer"></div>
  <div class="seekbar__progress"></div>
  `;
  seek.insertAdjacentHTML("afterbegin", template);


  seek.value = 0;

  var seekbar_handle,
      seekbar_buffer,
      seekbar_progress;

  seek.addEventListener("click", function(e){
    var cx = e.clientX - seek.offsetLeft;
    console.log('cx',e.clientX);
    console.log('offsetLeft', seek.offsetLeft);
    var percent =   cx / seek.offsetWidth * 100;
    seek.value = percent;
    console.log(percent);
    videoDom.currentTime = videoDom.duration * percent / 100;
    seek.update();
  });
  // Update the seek bar as the video plays
  videoDom.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / videoDom.duration) * videoDom.currentTime;
    if(videoDom.shaka){
      var bufferValue = (100 / videoDom.duration) * videoDom.shaka.getBufferedInfo().total[0].end;
      seek.bufferValue = bufferValue;
    }
    // Update the slider value

    seek.value = value;


    seek.update();
    // console.log(seekbar.value);
  });

  seek.init = function(){
    seekbar_handle = seek.getElementsByClassName('seekbar__handle')[0];
    seekbar_progress = seek.getElementsByClassName('seekbar__progress')[0];
    seekbar_buffer = seek.getElementsByClassName('seekbar__buffer')[0];


  }
  seek.update = function(){
    seekbar_handle.style.left= seek.value +'%';
    seekbar_progress.style.width= seek.value +'%';
    seekbar_buffer.style.width= seek.bufferValue +'%';
  }

  return seek;

}
