
(function ($, root) {

    function audioControl () {
        this.audio = new Audio();
        this.status = 'pause';
    }
    audioControl.prototype = {
        play: function () {
            this.status = 'play';
            this.audio.play();
        },
        pause: function () {
            this.status = 'pause';
            this.audio.pause();
        },
        goTo: function (time) {
            this.audio.currentTime = time;
            this.play();
        },
        getSrc: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToNext: function () {
            $(this.audio).on('ended', function (){
                $scope.find('.next_btn').trigger('click');
            })
        }
    }

    root.audioControl = audioControl;


})(window.Zepto, window.player || (window.player = {}))