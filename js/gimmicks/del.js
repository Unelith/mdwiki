(function($){
    'use strict';
    var titleGimmick = {
        name: 'del',
        once: function() {
            $.md.linkGimmick(this, 'del', del);
        }
    };
    $.md.registerGimmick(titleGimmick);

    function del($links, opt, href) {
        return $links.each(function(i,link) {
            var $link = $(link);

            // Remove parent
            $link.parent().remove();
        });
    }
}(jQuery));
