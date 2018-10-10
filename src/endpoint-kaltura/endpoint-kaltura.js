export function getKalturaData(entryId, videoDom, prefs="{}"){

  return new Promise(function(resolve, reject){

    prefs = JSON.parse(prefs);

    var wid = prefs.wid || '_676152';
    var partnerId = prefs.partnerId || 676152;

    window["kalturaJspCallback_"+entryId] = function(data){
      // http://cdnapi.kaltura.com/p/2376541/sp/237654100/playManifest/entryId/0_gq6w4m8p/flavorId/0_nlpk46wr/format/url/protocol/http/a.mp4
      // https://cdnapisec.kaltura.com/p/2376541/sp/237654100/playManifest/entryId/0_2wr8pq3i/format/url/protocol/https
      //https://cfvod.kaltura.com/scf/pd/p/2376541/sp/237654100/serveFlavor/entryId/0_2wr8pq3i/v/2/ev/3/flavorId/0_l8p0qkfi/name/a.mp4?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZnZvZC5rYWx0dXJhLmNvbS9zY2YvcGQvcC8yMzc2NTQxL3NwLzIzNzY1NDEwMC9zZXJ2ZUZsYXZvci9lbnRyeUlkLzBfMndyOHBxM2kvdi8yL2V2LzMvZmxhdm9ySWQvMF9sOHAwcWtmaS9uYW1lLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1MjExMjg3NzN9fX1dfQ__&Signature=MRucObE2gIdQxnfAPKOhaUkGHjDB~etp0ONMvWWSVH25244wFyYOk-0Bn6GRaR81vGJS2bXEx8UEbzZIyqyYFFyqaWC1Hgb10lj0XcEo2qDpEqxtfbupX5RIBXr2SxZt5i2Stcm-3gYaQrsfmKH7ciTX09oYNXT~8fxrkA-hNBQSA6hUWPOyBF-Q7UCKIx36tldx~pPy~kfpmJuQN7nNr1EiVEZW3WYIQHZcIdHYiMAxiuZ~HO9BEumk1Ld2LLJlKzKJmLOhHn4xw4o8Fn7WJTCjodMSK35-2ipTiCOcWadH1xiVC3k0lUdI4T-wau4FJMdAXHFkRLYouF94i8HPhw__&Key-Pair-Id=APKAJT6QIWSKVYK3V34A
      var flaworIds = [];
      var flavors = [];
      data[1].forEach(function(flavor, ix){
        flavor.url = "http://cdnapi.kaltura.com/p/"+ partnerId +"/sp/"+ partnerId +"00/playManifest/entryId/"+ entryId +"/flavorId/"+ flavor.id +"/format/url/protocol/http/a." + flavor.fileExt;
        if(flavor.fileExt=="mp4"){
          flaworIds.push(flavor.id);
          flavor.type = "video/mp4"
          flavors.push(flavor);
        }
      });

      //var hlsManifestUrl = "https://cdnapisec.kaltura.com/p/"+ partnerId +"/sp/"+ partnerId +"00/playManifest/entryId/"+ entryId +"/flavorIds/" + [...flaworIds] + "/format/applehttp/protocol/http/a.m3u8?ks="+data[0].ks+"&clientTag=html5:v2.69.5";
      //var hlsManifestUrl = "https://cdnapisec.kaltura.com/p/"+ partnerId +"/sp/"+ partnerId +"00/playManifest/entryId/"+ entryId +"/flavorIds/" + [...flaworIds] + "/format/applehttp/protocol/http/a.m3u8?referrer=aHR0cHM6Ly9jb3JwLmthbHR1cmEuY29t&playSessionId=ae1b214e-52b4-830d-8b23-01c73970115b&clientTag=html5:v2.69.5&uiConfId=36784651";
      var hlsManifestUrl = "https://cdnapisec.kaltura.com/p/"+ partnerId +"/sp/"+ partnerId +"00/playManifest/entryId/"+ entryId +"/flavorIds/" + [...flaworIds] + "/format/applehttp/protocol/https/a.m3u8";
      //var hlsManifestUrl = "https://cdnapisec.kaltura.com/p/"+ partnerId +"/sp/"+ partnerId +"00/playManifest/entryId/"+ entryId +"/flavorIds/" + [...flaworIds] + "/format/applehttp/protocol/https/a.m3u8?referrer=aHR0cHM6Ly9jb3JwLmthbHR1cmEuY29t&playSessionId=ae1b214e-52b4-830d-8b23-01c73970115b&clientTag=html5:v2.69.5&uiConfId=36784651";
      resolve({type: "kaltura", flavors: flavors, videoDom: videoDom, hlsManifestUrl: hlsManifestUrl});
    };

    //https://searchcode.com/codesearch/view/44048077/
    // http://www.kaltura.com/api_v3/testme/# -------------
    // http://www.kaltura.com/api_v3/api_schema.php
    //https://knowledge.kaltura.com/faq/how-retrieve-metadata-media-entry-using-api
    //https://cfvod.kaltura.com/p/2376541/sp/237654100/thumbnail/entry_id/0_gq6w4m8p/version/100002/width/800/quality/75/
    //https://knowledge.kaltura.com/kaltura-thumbnail-api
    //http://cfvod.kaltura.com/p/2376541/sp/237654100/thumbnail/entry_id/0_2wr8pq3i/version/100002/width/100/vid_slices/100

    //https://developer.kaltura.com/api-docs/Overview

    var url = 'https://cdnapisec.kaltura.com/api_v3/?service=multirequest&format=9' +
    '&1:service=session&1:action=startWidgetSession&1:widgetId=' + wid +
    '&2:service=flavorasset&2:action=getByEntryId&2:ks={1:result:ks}&2:entryId=' + entryId +
    '&3:service=baseEntry&3:action=get&3:ks={1:result:ks}&3:entryId=' + entryId +
    //'&4:service=media&4:action=get&4:ks={1:result:ks}&4:entryId=' + entryId +
    '&callback=kalturaJspCallback_'+entryId;
    var jsonPScript = document.createElement('script');
    jsonPScript.src = url;
    document.getElementsByTagName('head')[0].appendChild(jsonPScript);

  });

}
