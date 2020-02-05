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

            // Detect parent paragraph, if it exists
            var linkParent = $link.parent();
            var linkSiblings = $link.siblings().not('br'); // We don't want the stray <br> to influence the removal condition
            if (linkParent.hasClass('md-text') && linkSiblings.length === 0) {
              var linkParagraph = linkParent.closest('p');
              linkParagraph.remove();
              return;
            }

            $link.remove();
        });
    }
}(jQuery));
