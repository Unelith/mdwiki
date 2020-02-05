(function($){
    'use strict';
    var floatNextGimmick = {
        name: 'floatnext',
        once: function() {
            $.md.linkGimmick(this, 'floatnext', floatNext);
        }
    };
    $.md.registerGimmick(floatNextGimmick);

    function floatNext($links, opt, href) {
        return $links.each(function(i,link) {
            var $link = $(link);
            var param = $link.attr('href');

            // On the first iteration, tag all images so that there is a decent
            //  selector for the user to utilize
            if (i === 0) {
              var images = $('.md-image-group');
              var individualImageCols = images.children().not('.md-text');
              individualImageCols.addClass('md-image-column');
            }

            // Isolate params
            var params = param.split(',');
            params = params.map(function(arg) {
              return arg.trim();
            });

            // The link will be wrapped in a paragraph, find it and refer to it
            //  rather than the link (so that functions like .nextAll work
            //  as we intend)
            var linkParagraph = $link.closest('p');

            if (params.length < 2) {
              console.warn('\'floatnext\' gimmick used, but not enough parameters given (2 required)');
              // Make sure to remove gimmick invocation before returning
              linkParagraph.remove();
              return;
            }

            // Resolve parameter names
            var float = params[0];
            var selector = params[1];

            // Find the target element. It should be the first one matching the
            //  selector, looking only after the invocation.

            // First, look on the same level
            var target = linkParagraph.nextAll(selector).first();
            if (target.length === 0) {
              // If none on the same level, look deeper.
              target = linkParagraph.nextAll().find(selector).first();
            }
            if (target.length === 0) {
              // If still no matching elements, bail out
              console.warn('No matching elements for selector \'' + selector + '\' for \'floatnext\' gimmick');
              // Make sure to remove gimmick invocation before returning
              linkParagraph.remove();
              return;
            }
            target.addClass('md-floatnext-target'); // Mark it for later filtering

            var targetParent = target.parent();
            // In case of pulling out of a floatenv, the remaining elements
            //  must be handled.
            if (targetParent.attr('id') !== 'md-content' && (targetParent.hasClass('md-floatenv') || targetParent.hasClass('md-image-group'))) {
              var targetSiblings = target.siblings();

              // Pull the target out of the floatenv first.
              targetParent.before(target);

              // If target has any siblings, they should be pulled out of
              //  the floatenv and placed right after the target.
              if (targetSiblings.length > 0) {
                targetSiblings.find('.md-text').wrap('<p></p>'); // Also isolate every md-text as a paragraph
                targetParent.before(targetSiblings);
              }

              // And the parent must be deleted to not cause ugly breaks
              targetParent.remove();
            }

            // Now, apply style to the target
            target.css('float', float);
            target.css('width', 'auto');

            // Drop the class that indicates the target
            target.removeClass('md-floatnext-target');

            // Remove gimmick invocation
            linkParagraph.remove();
        });
    }
}(jQuery));
