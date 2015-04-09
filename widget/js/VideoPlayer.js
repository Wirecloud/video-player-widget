var VideoPlayer = function () {

    this.url = '';

    MashupPlatform.wiring.registerCallback('url', this.recv_video.bind(this));
};

VideoPlayer.prototype = {

    constructor: VideoPlayer,


    recv_video: function (url) {
        
        this.url = url;

        var container = document.getElementById('container');
        var videoOutput = this.create_video(this.url);

        this.remove_child_nodes(container);
        
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

        this.remove_child_nodes(container);

        container.appendChild(placeholder);
    },

    create_placeholder: function () {

        var placeholder = document.createElement('span');

        placeholder.className = 'placeholder';
        placeholder.textContent = 'No video received yet!';
        document.body.className = 'static';

        return placeholder;
    },

    remove_child_nodes: function (container) {
        
        while (container.hasChildNodes()) {
            container.firstChild.remove();
        }
    }
};