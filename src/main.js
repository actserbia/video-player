/*
babel-polyfill, core-js
*/

import style from './main.scss'
import devStyle from './layout.scss.dev'

import {getKalturaData} from './kaltura/kaltura.js'
import linkVideo from './MSE/mseApi.js'

const resolveKaltura = (data) => {
console.log(data);
  [...data.data[1]].forEach(function(flavor){
    console.log(flavor);
    //console.log(data.videoDom);
    data.videoDom.insertAdjacentHTML( 'beforeend', '<source src="'+flavor.url+'" type="video/'+flavor.containerFormat+'">');
  })
}

const resolveMashina = () => {
  //console.log('resolveKalture', data[1][0].videoCodecId);
  //console.log('resolveKalture',  data);
  //linkVideo(data[1]);

  //data[1].map(videoFlavor => {
  //  linkVideo(videoFlavor.url, videoFlavor.fileExt, videoFlavor.videoCodecId);
    //console.log( videoFlavor.fileExt, videoFlavor.videoCodecId);
  //});
  // linkVideo(data[1][0].url, data[1][0].fileExt, data[1][0].videoCodecId);
}

// ITERATE PAGE VIDEOS
let htmlVideos = document.getElementsByTagName('video');

[...htmlVideos].forEach(function(video, index){
  switch (video.dataset.vtype) {
    case "kaltura" :
      getKalturaData(video.dataset.vid, video).then(resolveKaltura);
      break;
    case "mashina" :
      resolveMashina();
      break;
  }
});
