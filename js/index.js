window.onload = function() {
    "use strict";

    function recv_video(url) {
    	var container = document.getElementById('container');
    	while (container.hasChildNodes()) {
    		container.firstChild.remove();
    	}
    	var videoOutput = document.createElement('video');
    	videoOutput.id = 'videoOutput';
        videoOutput.src = url;
    	videoOutput.className = 'video';
        videoOutput.autoplay = true;
        videoOutput.controls = false;
        document.getElementsByTagName('body')[0].className = '';
        container.appendChild(videoOutput);
    }

    MashupPlatform.wiring.registerCallback('url', recv_video);

};
