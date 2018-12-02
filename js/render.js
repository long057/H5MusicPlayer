
(function ($, root) {
    
    var $scope = $(document.body);

    function renderImg (src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $scope.find('.img img').attr('src', src);
            root.blurImg(this, $scope);
        }
    }
    function renderInfo (data) {
        var html = '<div class="song_name">'+ data.song + '</div>\
                    <div class="singer">'+ data.singer + '</div>\
                    <div class="album">'+ data.album + '</div>';
        $scope.find('.song_info').html(html);
    }   

    function renderIsLike (isLike) {
        // console.log(isLike);
        if(isLike) {
            $scope.find('.like_btn').addClass('liking');
        } else {
            $scope.find('.like_btn').removeClass('liking');
        }
    }

    function render (data) {
        // console.log(data);
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
    root.render = render;


})(window.Zepto, window.player || (window.player = {}))