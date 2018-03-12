import style from './main.scss'
import devStyle from './layout.scss.dev'

import getKalturaData from './kaltura/get-data.js'

let domVids = document.getElementsByTagName('video')

let vids = Array.from(domVids);

console.log( domVids )

console.log( [...domVids] )

console.log( vids )



/*
let vids = document.getElementsByTagName('video');
for(i=0; i < vids.lenght; i++){
  let vid = vids[i];

}


Array.prototype.forEach.call(, function(e){
  console.log(e);
});

//Array.from( document.getElementsByTagName('video') ).forEach(function(el){
//  console.log( el );
//});


getKalturaData('0_gq6w4m8p');
*/
/*
require('./kaltura/kWidget.getSources.js');
kWidget.getSources({
  //wid = '_' + 2376541;
  partnerId: 2376541,
  //callback = 'sourcesReady';
});
*/
