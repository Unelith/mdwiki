(function($){
    'use strict';
    var titleGimmick = {
        name: 'title',
        once: function() {
            $.md.linkGimmick(this, 'title', title);
        }
    };
    $.md.registerGimmick(titleGimmick);

    function title($links, opt, href) {
        return $links.each(function(i,link) {
            var $link = $(link);

            var setTitle = $link.attr('href');
            var oldTitle = document.title;
            var newTitle = oldTitle + (oldTitle !== '' ? ' - ' : '') + setTitle;
            document.title = newTitle;

            $link.remove();
        });
    }
}(jQuery));
