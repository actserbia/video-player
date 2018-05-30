export function getJWPData(entryId, videoDom){

  return new Promise(function(resolve, reject){



      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://cdn.jwplayer.com/v2/media/' + entryId);
      //xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);

              var resolvedData =  {
                type: "jwp",
                videoDom: videoDom,
                flavors:[],
              }

              response.playlist[0].sources.forEach(function(source){

                switch (source.type) {
                  case 'video/mp4' :
                    source.url = source.file;
                    resolvedData.flavors.push(source);
                    break;
                  case 'application/vnd.apple.mpegurl' :
                    resolvedData.hlsManifestUrl = source.file;
                    break;

                }

              });


              resolve(resolvedData);
          }
      };
      xhr.send();

  });


}
