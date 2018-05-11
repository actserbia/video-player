var hlsPlayer = document.createElement("video");
hlsPlayer.controls = true;
hlsPlayer.src = 'http://www.streambox.fr/playlists/test_001/stream.m3u8';

wrap.appendChild(hlsPlayer);
hlsPlayer.play();
