
(function ($, root) {

    function controlManage(index, len) {
        this.index = index;
        this.len = len;
    }

    controlManage.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.controlManage = controlManage;

})(window.Zepto, window.player || (window.player = {}))