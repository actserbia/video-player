/*
babel-polyfill, core-js
*/

import style from './main.scss'
import devStyle from './layout.scss.dev'

import getKalturaData from './kaltura/get-data.js'
import linkVideo from './MSE/mseApi.js'


const resolveKaltura = function(data, entryId) {
  //console.log('resolveKalture', data[1][0].videoCodecId);
  console.log('resolveKalture',  data);
  linkVideo(data[1]);



  //data[1].map(videoFlavor => {
  //  linkVideo(videoFlavor.url, videoFlavor.fileExt, videoFlavor.videoCodecId);
    //console.log( videoFlavor.fileExt, videoFlavor.videoCodecId);
  //});
  // linkVideo(data[1][0].url, data[1][0].fileExt, data[1][0].videoCodecId);
}

// ITERATE PAGE VIDEOS
let htmlVideos = document.getElementsByTagName('video');
getKalturaData('0_gq6w4m8p').then(resolveKaltura);
/*
[...htmlVideos].forEach(function(video, index){
  if ( video.classList.contains('video-player-kaltura') ){
    getKalturaData(video.dataset.vid).then(resolveKaltura);//dataset
  };
});
*/
