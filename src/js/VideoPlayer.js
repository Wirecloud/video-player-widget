/* export VideoPlayer */

window.VideoPlayer = (function () {
    "use strict";

    var YOUTUBEHOSTS = [
        "www.youtube.com",
        "youtu.be",
    ]

    /** * CONSTRUCTOR ***/
    var VideoPlayer = function () {
        MashupPlatform.wiring.registerCallback('url', this.recv_video.bind(this));

        var url = MashupPlatform.prefs.get('initial-url').trim();
        if (url !== "") {
            this.recv_video(url);
        }
    };


    /** * PUBLIC ***/
    VideoPlayer.prototype = {

        constructor: VideoPlayer,


        recv_video: function (data) {
            var url;

            if (typeof data === "string") {
                try {
                    url = JSON.parse(data).url;
                } catch (e) {
                    // Is a normal string
                }
            } else {
                url = data.url;
            }

            // Check if the URL is valid
            try {
                new URL(url);
            } catch (e) {
                throw new MashupPlatform.wiring.EndpointValueError("invalid url: " + e);
            }

            this.url = url;

            // Handle youtube videos
            if (YOUTUBEHOSTS.indexOf(new URL(this.url).host) !== -1) {

                // Normalize host URL and build iframe uri
                this.url = this.url.replace("youtu.be", "www.youtube.com/embed");
                this.url = this.url.replace('/watch?v=','/embed/');

                // Remove any html parameters
                var i = this.url.indexOf("&");
                if (i !== -1) {
                    this.url = this.url.slice(0, i);
                }

                this.insertYoutubeVideo(this.url);

            // Handle other videos
            } else {
                var container = document.getElementById('container');
                var videoOutput = this.create_video(this.url);

                remove_child_nodes(container);

                container.appendChild(videoOutput);
            }
        },

        // Create iframe and display the youtube video
        insertYoutubeVideo: function (url) {

            var videoOutput = document.createElement("div");
            videoOutput.classList.add("youtubeDiv");

            var frame = document.createElement("iframe");
            frame.classList.add("youtubeVideo");
            frame.setAttribute('src', url);
            frame.setAttribute('frameborder', 0);
            frame.setAttribute('allowfullscreen', 'allowfullscreen');

            var container = document.getElementById('container');
            remove_child_nodes(container);

            videoOutput.appendChild(frame);
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


    /** * PRIVATE ***/
    var remove_child_nodes = function remove_child_nodes(container) {

        while (container.hasChildNodes()) {
            container.firstChild.remove();
        }
    }


    return VideoPlayer;

})();
