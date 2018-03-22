export function getKalturaData(entryId, videoDom){

  return new Promise(function(resolve, reject){

    var wid = '_2376541';
    var partnerId = 2376541;

    window["kalturaJspCallback_"+entryId] = function(data){
      // http://cdnapi.kaltura.com/p/2376541/sp/237654100/playManifest/entryId/0_gq6w4m8p/flavorId/0_nlpk46wr/format/url/protocol/http/a.mp4
      // https://cdnapisec.kaltura.com/p/2376541/sp/237654100/playManifest/entryId/0_2wr8pq3i/format/url/protocol/https
      //https://cfvod.kaltura.com/scf/pd/p/2376541/sp/237654100/serveFlavor/entryId/0_2wr8pq3i/v/2/ev/3/flavorId/0_l8p0qkfi/name/a.mp4?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZnZvZC5rYWx0dXJhLmNvbS9zY2YvcGQvcC8yMzc2NTQxL3NwLzIzNzY1NDEwMC9zZXJ2ZUZsYXZvci9lbnRyeUlkLzBfMndyOHBxM2kvdi8yL2V2LzMvZmxhdm9ySWQvMF9sOHAwcWtmaS9uYW1lLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1MjExMjg3NzN9fX1dfQ__&Signature=MRucObE2gIdQxnfAPKOhaUkGHjDB~etp0ONMvWWSVH25244wFyYOk-0Bn6GRaR81vGJS2bXEx8UEbzZIyqyYFFyqaWC1Hgb10lj0XcEo2qDpEqxtfbupX5RIBXr2SxZt5i2Stcm-3gYaQrsfmKH7ciTX09oYNXT~8fxrkA-hNBQSA6hUWPOyBF-Q7UCKIx36tldx~pPy~kfpmJuQN7nNr1EiVEZW3WYIQHZcIdHYiMAxiuZ~HO9BEumk1Ld2LLJlKzKJmLOhHn4xw4o8Fn7WJTCjodMSK35-2ipTiCOcWadH1xiVC3k0lUdI4T-wau4FJMdAXHFkRLYouF94i8HPhw__&Key-Pair-Id=APKAJT6QIWSKVYK3V34A
      data[1].forEach(function(flavor, ix){
        flavor.url = "http://cdnapi.kaltura.com/p/"+ partnerId +"/sp/"+ partnerId +"00/playManifest/entryId/"+ entryId +"/flavorId/"+ flavor.id +"/format/url/protocol/http/a." + flavor.fileExt;
        //console.log(flavor);
      })
      resolve({data: data, videoDom: videoDom});
    };

    //https://searchcode.com/codesearch/view/44048077/
    // http://www.kaltura.com/api_v3/testme/# -------------
    // http://www.kaltura.com/api_v3/api_schema.php
    //https://knowledge.kaltura.com/faq/how-retrieve-metadata-media-entry-using-api
    //https://cfvod.kaltura.com/p/2376541/sp/237654100/thumbnail/entry_id/0_gq6w4m8p/version/100002/width/800/quality/75/
    //https://knowledge.kaltura.com/kaltura-thumbnail-api
    //http://cfvod.kaltura.com/p/2376541/sp/237654100/thumbnail/entry_id/0_2wr8pq3i/version/100002/width/100/vid_slices/100

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
