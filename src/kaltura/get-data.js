export default function getSources(entryId){

  return new Promise(function(resolve, reject){

    var wid = '_2376541';
    var partnerId = 2376541;
    var callback = 'sourcesReady';

    window["kalturaJspCallback_"+entryId] = function(data){
      resolve(data, entryId);
    };

    //https://searchcode.com/codesearch/view/44048077/
    // http://www.kaltura.com/api_v3/testme/#
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
