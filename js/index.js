window.onload = function() {
    "use strict";

    function recv_video(data) {
        
        data = data.split(' ');
        var username = data[0];
        var url = data[1];

    	var container = document.getElementById('container');
    	var videoOutput = create_video(url);
        //var nav_bar = document.createElement('nav');

        while (container.hasChildNodes()) {
    		container.firstChild.remove();
    	}

        //nav_bar.id = 'top-bar';
        //nav_bar.className = 'top-bar';

        
        container.appendChild(videoOutput);
        //container.appendChild(nav_bar);
    }

    function create_video (url) {
        
        var videoOutput = document.createElement('video');

        videoOutput.id = 'videoOutput';
        videoOutput.src = url;
        videoOutput.className = 'video';
        videoOutput.autoplay = true;
        videoOutput.controls = true;
        document.getElementsByTagName('body')[0].className = '';

        return videoOutput;
    }

    function terminate_stream () {
        
        var container = document.getElementById('container');
        var placeholder = document.createElement('span');
        
        placeholder.className = 'placeholder';
        placeholder.textContent = 'No video received yet!';
        document.getElementsByTagName('body')[0].className = 'static';

        while (container.hasChildNodes()) {
            container.firstChild.remove();
        }

        container.appendChild(placeholder);

    }

    MashupPlatform.wiring.registerCallback('url', recv_video);
    MashupPlatform.wiring.registerCallback('terminate_stream', terminate_stream)

};
