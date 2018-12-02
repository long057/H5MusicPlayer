
(function ($, root) {

    var $scope = $(document.body);
    var control;

    function renderList (songList) {
        var html = '';
        var len = songList.length;
        for(var i = 0; i < len; i ++) {
            html += '<li><h3>' + songList[i].song + '<span> - ' + songList[i].singer + '</span></h3></li>'
        }
        $scope.find('.list_wrap').html(html);
        bindEvent();
    }

    function bindEvent() {
        var $li = $scope.find('.list_wrap li');
        $li.on('click', function (e) {
            var index = $(this).index();
            $scope.find('li.active').removeClass('active');
            $(this).addClass('active');
            control.index = index;
            $scope.trigger('play:change', [index, true]);
            $scope.find('.play_btn').addClass('playing');
            setTimeout(function () {
                $scope.find('.play_list').removeClass('show');
            }, 1000)
        })
    }

    function show(controlManage) {
        control = controlManage;
        $scope.find('.play_list').addClass('show');
        $scope.find('.list_wrap .active').removeClass('active')
        $scope.find('.list_wrap li').eq(control.getIndex(0)).addClass('active');
    }

    root.playList = {
        renderList: renderList,
        show: show
    }
})(window.Zepto, window.player || {})