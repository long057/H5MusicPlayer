
var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var songList;
var controlManage;
var audio = new root.audioControl()

function clickEvent () {
    $scope.on('play:change', function (event, index, flag) {
        audio.getSrc(songList[index].audio);
        if(audio.status == 'play' || flag) {   
            root.process.start();
            audio.play();
        }
        root.process.renderAllTime(songList[index].duration);
        root.process.update(0);
        root.render(songList[index]);
    });
    $scope.on('click', '.prev_btn', function () {
        var index = controlManage.prev();
        $scope.trigger('play:change', index);

    }).on('click', '.next_btn', function () {
        var index = controlManage.next();
        $scope.trigger('play:change', index);

    }).on('click', '.play_btn', function () {
        $scope.find('.play_btn').toggleClass('playing')
        if(audio.status == 'play') {
            audio.pause();
            root.process.stop();
        } else {
            root.process.start();
            audio.play();
        }
    }).on('click', '.list_btn', function () {
        root.playList.show(controlManage);
    }).on('click', '.like_btn', function () {
        $scope.find('.like_btn').toggleClass('liking');
        var index = controlManage.getIndex(0);
        if(songList[index].isLike) {
            songList[index].isLike = false;
        } else {
            songList[index].isLike = true;
        }
    })
}

function bindTouch () {
    var $point = $scope.find('.slider');
    var offset = $scope.find('.pro_wrap').offset();
    var left = offset.left;
    var width = offset.width;
    $point.on('touchstart', function (e) {
        root.process.stop();
        audio.pause();
        $scope.find('.play_btn').removeClass('playing');
    }).on('touchmove', function (e){
        var x = e.changedTouches[0].clientX - left;
        var per = x / width ;
        if(per < 0) {
            per = 0;
        }
        if(per > 1) {
            per = 1;
            $scope.find('.slider::after').css({
                right: '13px'
            })
        }
        root.process.update(per);
        per = Math.floor( per * 100  - 100);
        $scope.find('.pro_top').css({
            transform: 'translateX(' + per + '%)'
        })
        
        
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX - left;
        var per = x / width;
        var curTime = per * songList[controlManage.getIndex(0)].duration;
        audio.goTo(curTime);
        root.process.start(per)
        $scope.find('.play_btn').addClass('playing');
    })
}


function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            clickEvent();  
            bindTouch();         
            songList = data;
            root.render(data[0]);
            root.process.renderAllTime(data[0].duration);
            root.playList.renderList(songList);
            controlManage = new root.controlManage(0, songList.length);
            audio.getSrc(data[0].audio);
        },
        error: function () {
            console.log('error');
        }
    })
}

getData('../mock/data.json');