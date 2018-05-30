var Hls = require('hls.js');



export default function(video, hlsManifestUrl) {




  var config = {
        autoStartLoad: true,
    	  startPosition : -1,
        capLevelToPlayerSize: false,
        debug: false,
        defaultAudioCodec: undefined,
        initialLiveManifestSize: 1,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        maxBufferSize: 5*1000*1000, //
        maxBufferHole: 0.5,
        lowBufferWatchdogPeriod: 0.5,
        highBufferWatchdogPeriod: 3,
        nudgeOffset: 0.1,
        nudgeMaxRetry : 3,
        maxFragLookUpTolerance: 0.2,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
        enableWorker: true,
        enableSoftwareAES: true,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 1,
        manifestLoadingRetryDelay: 500,
        manifestLoadingMaxRetryTimeout : 64000,
        startLevel: undefined,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 500,
        levelLoadingMaxRetryTimeout: 64000,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 500,
        fragLoadingMaxRetryTimeout: 64000,
        startFragPrefetch: false,
        appendErrorMaxRetry: 3,
        //loader: customLoader,
        //fLoader: customFragmentLoader,
        //pLoader: customPlaylistLoader,
        //xhrSetup: XMLHttpRequestSetupCallback,
        //fetchSetup: FetchSetupCallback,
        //abrController: customAbrController,
        //timelineController: TimelineController,
        enableWebVTT: true,
        enableCEA708Captions: true,
        stretchShortVideoTrack: false,
        maxAudioFramesDrift : 1,
        forceKeyFrameOnDiscontinuity: true,
        abrEwmaFastLive: 5.0,
        abrEwmaSlowLive: 9.0,
        abrEwmaFastVoD: 4.0,
        abrEwmaSlowVoD: 15.0,
        abrEwmaDefaultEstimate: 500000,
        abrBandWidthFactor: 0.95,
        abrBandWidthUpFactor: 0.7,
        minAutoBitrate: 0
    };









  if(Hls.isSupported()) {
    var hls = new Hls(config);

window.hlsPlayers = window.hlsPlayers || [];
window.hlsPlayers.push(hls);
video.hlsjs = hls;


    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(hlsManifestUrl);
    });


  }
}
