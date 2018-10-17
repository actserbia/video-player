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
  let videoDom = data.videoBundler.getElementsByTagName('video')[0];
  const playerWrap = playerTemplate(videoDom);
  if (Hls.isSupported()) { //MediaSource API
    hls_app(videoDom, data.hlsManifestUrl);
  }
  else if (videoDom.canPlayType('application/vnd.apple.mpegurl')) { //built-in HLS
    videoDom.src = data.hlsManifestUrl
  }
  else {
    data.flavors.forEach(function(flavor){
      videoDom.insertAdjacentHTML( 'beforeend', '<source src="'+flavor.url+'" type="'+flavor.type+'">');
    });
  }
  imaAd(data.videoBundler);
}


// ITERATE PAGE VIDEOS
let videoBundlers = document.getElementsByClassName('video-bundler');
[...videoBundlers].forEach(function(videoBundler, index) {
  let video = videoBundler.getElementsByTagName('video')[0];
  switch (video.dataset.vtype) {
    case "kaltura" :
      getKalturaData(video.dataset.vid, videoBundler, video.dataset.prefs).then(resolveVideo);
      break;
    case "jwp" :
      //resolveJWP(video);
      getJWPData(video.dataset.vid, videoBundler).then(resolveVideo);
      break;
  }
});
