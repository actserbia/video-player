/*
babel-polyfill, core-js
*/

import style from './main.scss'
import devStyle from './layout.scss.dev'

import {getKalturaData} from './kaltura/kaltura.js'
import linkVideo from './MSE/mseApi.js'

const MASINA_BASE_URL = "http://vasilie.net/video-sources/?vid=";

const resolveKaltura = (data) => {
  [...data.data[1]].forEach(function(flavor){
    data.videoDom.insertAdjacentHTML( 'beforeend', '<source src="'+flavor.url+'" type="video/'+flavor.containerFormat+'">');
  })
}

const resolveMashina = (data, video) => {
  linkVideo(data, video);
}

// ITERATE PAGE VIDEOS
let htmlVideos = document.getElementsByTagName('video');

[...htmlVideos].forEach(function(video, index){
  switch (video.dataset.vtype) {
    case "kaltura" :
      getKalturaData(video.dataset.vid, video).then(resolveKaltura);
      break;
    case "mashina" :
      fetch(MASINA_BASE_URL + video.dataset.vid )
        .then(function(response){
          return response.json();
        })
        .then(function(res){
            resolveMashina(res, video);
        });
      break;
  }
});
