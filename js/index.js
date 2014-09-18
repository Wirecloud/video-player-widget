var VideoPlayer = function () {

    this.username = '';
    this.url = '';

    MashupPlatform.wiring.registerCallback('url', this.recv_video.bind(this));
    MashupPlatform.wiring.registerCallback('terminate_stream', this.terminate_stream.bind(this));
};

VideoPlayer.prototype = {

    constructor: VideoPlayer,


    recv_video: function (data) {
        
        data = data.split(' ');
        this.username = data[0];
        this.url = data[1];

        var container = document.getElementById('container');
        var videoOutput = this.create_video(this.url);

        this.remove_child_nodes(container);
        
        container.appendChild(videoOutput);
    },


    create_navbar: function () { //TODO
        
        var nav_bar = document.createElement('nav');

        nav_bar.id = 'top-bar';
        nav_bar.className = 'top-bar';

        container.appendChild(nav_bar);
    },


    create_video: function (url) {
        
        var videoOutput = document.createElement('video');

        videoOutput.id = 'videoOutput';
        videoOutput.src = url;
        videoOutput.className = 'video';
        videoOutput.autoplay = true;
        videoOutput.controls = true;
        document.getElementsByTagName('body')[0].className = '';

        return videoOutput;
    },


    terminate_stream: function () {
        
        this.username = '';
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
        document.getElementsByTagName('body')[0].className = 'static';

        return placeholder;
    },

    remove_child_nodes: function (container) {
        
        while (container.hasChildNodes()) {
            container.firstChild.remove();
        }
    }
};