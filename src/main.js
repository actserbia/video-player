/*
babel-polyfill, core-js
*/

import style from './main.scss'
import devStyle from './layout.scss.dev'

import {getKalturaData} from './endpoint-kaltura/endpoint-kaltura.js'
import {getJWPData} from './endpoint-jwp/endpoint-jwp.js'
//import linkVideo from './MSE/mseApi.js'
import playerTemplate from './player-template/player-template.js'
import imaAd from './IMA-Ads/ima-ad.js'
//import shaka_app from './shaka-player-app/app.js'
import hls_app from './hls-player/hls-player.js'

var Hls = require('hls.js');


const MASINA_BASE_URL = "http://vasilie.net/video-sources/?vid=";

if (!Array.from) {
  Array.from = require('array-from');
}

const resolveVideo = (data) => {

  //console.log(data.type, data.flavors)

  const playerWrap = playerTemplate(data.videoDom);

  if (Hls.isSupported()) { //MediaSource API
    hls_app(data.videoDom, data.hlsManifestUrl);
  }
  else if (data.videoDom.canPlayType('application/vnd.apple.mpegurl')) { //built-in HLS
    data.videoDom.src = data.hlsManifestUrl
  }
  else {
    data.flavors.forEach(function(flavor){
      data.videoDom.insertAdjacentHTML( 'beforeend', '<source src="'+flavor.url+'" type="'+flavor.type+'">');
    });
  }

  imaAd(playerWrap);
}


// ITERATE PAGE VIDEOS
let htmlVideos = document.getElementsByTagName('video');

[...htmlVideos].forEach(function(video, index){
  switch (video.dataset.vtype) {
    case "kaltura" :
      getKalturaData(video.dataset.vid, video, video.dataset.prefs).then(resolveVideo);
      break;
    case "jwp" :
      //resolveJWP(video);
      getJWPData(video.dataset.vid, video).then(resolveVideo);
      break;
  }
});
