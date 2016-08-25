var VideoPlayer = (function () {
    "use strict";

    /*** CONSTRUCTOR ***/
    var VideoPlayer = function () {
        MashupPlatform.wiring.registerCallback('url', this.recv_video.bind(this));
        this.recv_video(MashupPlatform.prefs.get('initial-url'));
    };


    /*** PUBLIC ***/
    VideoPlayer.prototype = {

        constructor: VideoPlayer,


        recv_video: function (url) {
            
            this.url = url;

            var container = document.getElementById('container');
            var videoOutput = this.create_video(this.url);

            remove_child_nodes(container);
            
            container.appendChild(videoOutput);
        },


        create_video: function (url) {
            
            var videoOutput = document.createElement('video');

            videoOutput.id = 'videoOutput';
            videoOutput.src = url;
            videoOutput.className = 'video';
            videoOutput.autoplay = true;
            videoOutput.controls = true;
            document.body.className = '';

            return videoOutput;
        },


        terminate_stream: function () {
            
            this.url = '';
            var container = document.getElementById('container'); 
            var placeholder = this.create_placeholder();

            remove_child_nodes(container);

            container.appendChild(placeholder);
        },

        create_placeholder: function () {

            var placeholder = document.createElement('span');

            placeholder.className = 'placeholder';
            placeholder.textContent = 'No video received yet!';
            document.body.className = 'static';

            return placeholder;
        }
    };


    /*** PRIVATE ***/
    function remove_child_nodes (container) {
            
        while (container.hasChildNodes()) {
            container.firstChild.remove();
        }
    }


    return VideoPlayer;

})();
