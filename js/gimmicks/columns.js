(function($){
    'use strict';
    var columnsGimmick = {
        name: 'columns',
        once: function() {
            $.md.linkGimmick(this, 'columns', columns);
        }
    };
    $.md.registerGimmick(columnsGimmick);

    function columns($links, opt, href) {
        return $links.each(function(i,link) {
            // Remove gimmick invocation
            var $link = $(link);
            var param = $link.attr('href');
            $link.remove();

            // Only do this once to avoid weird bugs
            if (i > 0) {
              return;
            }

            // Find general content of the article
            var content = $('#md-content');

            // We might want to align first table to the right
            var rightContent = null;
            if (param === 'first-table-right') {
              // Remove the table from the original location, but keep a copy
              var firstTable = content.find('table').first();
              rightContent = firstTable.clone();
              firstTable.remove();
            }

            // Find the floatenv and determine where the content should go
            var floatEnv = content.find('.md-floatenv').first();
            var rightCol = floatEnv.find('.col-sm-8').first();
            var middleCol = floatEnv.find('.md-text').first();

            // Mark the first floatEnv to avoid it
            floatEnv.attr('id', 'md-first-floatenv');

            // Drop the redundant md-text nested class
            var keepMdText = content.find('.md-floatenv').not('#md-first-floatenv').find('.md-text');
            keepMdText.addClass('preserve-md-text');
            var dropMdText = content.find('.md-text').not('.preserve-md-text');
            dropMdText.removeClass('md-text');

            // Determine the content that will go in the middle column
            var baseContent = content.children().not('#md-first-floatenv');

            // Remove it, but keep a copy
            var baseContentCopy = baseContent.clone();
            baseContent.remove();

            // Add the content to the middle column
            middleCol.append(baseContentCopy);

            // If it exists, append the content that should go to the right column
            if (rightContent !== null) {
              rightCol.append(rightContent);
            }
        });
    }
}(jQuery));
