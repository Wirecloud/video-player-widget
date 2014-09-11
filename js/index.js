window.onload = function() {
    "use strict";

    function recv_video(url) {
    	var body = document.getElementByTagName('body');
    	while (body.firstChild) {
    		body.firstChild.remove();
    	}
    	var videoOutput = document.createElement('video');
    	videoOutput.id = 'videoOutput';
    	videoOutput.className = 'video';
        videoOutput.src = url;
    }

    MashupPlatform.wiring.registerCallback('url', recv_video);

};
