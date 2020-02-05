(function($){
    'use strict';
    var rowBreakGimmick = {
        name: 'rowbreak',
        once: function() {
            $.md.linkGimmick(this, 'rowbreak', rowBreak);
        }
    };
    $.md.registerGimmick(rowBreakGimmick);

    function rowBreak($links, opt, href) {
        return $links.each(function(i,link) {
            var $link = $(link);

            // The link will be wrapped in a paragraph, find it and refer to it
            //  rather than the link
            var linkParagraph = $link.closest('p');

            // Remove gimmick invocation
            $link.remove();

            // The paragraph will actually prove very useful, as it can be
            //  transformed into the rowbreak
            linkParagraph.addClass('row');
        });
    }
}(jQuery));
