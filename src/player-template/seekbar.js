import './seekbar.scss'

export default function seekbar_container(){
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

  seek.addEventListener("click", function(e){
    var cx = e.clientX - seek.offsetLeft;

    // console.log(cx);
    // console.log(seek.offsetWidth );
    var percent =   cx / seek.offsetWidth * 100;
    seek.value = percent;
    seek.update();
  });
  seek.value = 0;

  var seekbar_handle,
      seekbar_buffer,
      seekbar_progress;

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
