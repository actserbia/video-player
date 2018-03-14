/*
babel-polyfill, core-js
*/

import style from './main.scss'
import devStyle from './layout.scss.dev'

import getKalturaData from './kaltura/get-data.js'
import linkVideo from './MSE/mseApi.js'


const resolveKaltura = function(data, entryId) {
  console.log('resolveKalture', data);
  linkVideo(data[2].dataUrl);
}

// ITERATE PAGE VIDEOS
let htmlVideos = document.getElementsByTagName('video');
[...htmlVideos].forEach(function(video, index){
  if ( video.classList.contains('video-player-kaltura') ){
    getKalturaData(video.dataset.vid).then(resolveKaltura);//dataset
  };
});
