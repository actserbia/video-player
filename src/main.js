/*
babel-polyfill, core-js
*/

import style from './main.scss'
import devStyle from './layout.scss.dev'

import {getKalturaData} from './kaltura/kaltura.js'
import linkVideo from './MSE/mseApi.js'
import playerTemplate from './player-template/player-template.js'
import imaAd from './IMA-Ads/ima-ad.js'
import shaka_app from './shaka-player-app/app.js'


const MASINA_BASE_URL = "http://vasilie.net/video-sources/?vid=";

const resolveKaltura = (data) => {

  [...data.data[1]].forEach(function(flavor){
    data.videoDom.insertAdjacentHTML( 'beforeend', '<source src="'+flavor.url+'" type="video/'+flavor.fileExt+'">');
  });
  const playerWrap = playerTemplate(data.videoDom);
  imaAd(playerWrap);
}

const resolveMashina = (data, video) => {
  linkVideo(data, video);
  //const playerWrap = playerTemplate(video);
  //imaAd(playerWrap);
}

const resolveShaka = (video, videoSrc) => {
  const playerWrap = playerTemplate(video);

  shaka_app(video, videoSrc);
  imaAd(playerWrap);
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
    case "shaka" :
      resolveShaka(video, video.dataset.vid);
      break;
  }
});
