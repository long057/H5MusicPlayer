
(function ($, root) {

    var $scope = $(document.body);
    var curDuration = 0;
    var startTime;
    var lastPer;
    var frameId = null;

    function formatTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    function renderAllTime(duration) {
        lastPer = 0;
        curDuration = duration;
 
        duration = formatTime(duration);
        $scope.find('.all_time').html(duration);
    }

    function update (percent) {
        // console.log(percent);
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur_time').html(curTime);
        var per = (percent - 1) * 100 ;
        $scope.find('.pro_top').css({
            transform: 'translateX(' + per + '%)'
        })
        
    }

    function start (percentage) {
        lastPer = percentage == undefined ? lastPer : percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame () {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000) ;
            // console.log(percent);
            if(percent < 1) {
                frameId = requestAnimationFrame(frame);
                update(percent);
            } else {
                cancelAnimationFrame(frameId);
                $scope.find('.next_btn').trigger('click');
            }
        }
        frame();
    }

    function stop () {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }


    root.process = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }



})(window.Zepto, window.player || (window.player = {}))