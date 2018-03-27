require('./player-template.scss')

export default function(videoDom) {
  videoDom.className = videoDom.className + " video-in-template";
  videoDom.controls = false;
  const wrap = document.createElement("div");
  wrap.className = 'player-wrap';
  const template = `

    <div class='ad-container'></div>

    <div class='control-bar'>
      <a class='play' href="#">play</a>
      <a class='pause' href="#">pause</a>
    </div>

  `;
  wrap.insertAdjacentHTML("afterbegin", template);
  videoDom.insertAdjacentElement("afterend", wrap);
  wrap.appendChild(videoDom);


  wrap.getElementsByClassName('play')[0].addEventListener('click', function(){
    //videoDom.play();
  });
  wrap.getElementsByClassName('pause')[0].addEventListener('click', function(){
    videoDom.pause();
  });


  return wrap;

}
