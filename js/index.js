window.onload = function() {
    "use strict";

    var changeURL = function changeURL(url) {
        var videoOutput = document.getElementById("videoOutput");
        videoOutput.src = url;

    };
    MashupPlatform.wiring.registerCallback('url', changeURL);

};
