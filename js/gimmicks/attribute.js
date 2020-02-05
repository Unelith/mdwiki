(function($){
    'use strict';
    var attributeGimmick = {
        name: 'attribute',
        once: function() {
            $.md.linkGimmick(this, 'attribute', attribute);
        }
    };
    $.md.registerGimmick(attributeGimmick);

    function attribute($links, opt, href) {
        return $links.each(function(i,link) {
            var $link = $(link);
            var param = $link.attr('href');

            // Isolate params
            var params = param.split(',');
            params = params.map(function(arg) {
              return arg.trim();
            });

            if (params.length < 3) {
              console.warn('\'attribute\' gimmick used, but not enough parameters given (at least 3 required)');
              // Make sure to remove gimmick invocation before returning
              $link.remove();
              return;
            }

            // Potentially handle multiple pairs of attribute name and value
            if (params.length > 3 && (params.length % 2 !== 1)) {
              console.warn('\'attribute\' gimmick used, but a wrong number of parameters given - last attribute name doesn\'t have a corresponding value');
              // Make sure to remove gimmick invocation before returning
              $link.remove();
              return;
            }

            // Resolve parameter names
            var selector = params[0];

            var attributes = {};
            var numberOfPairs = (params.length - 1) / 2;
            for (var j = 0; j < numberOfPairs; j++) {
              var attribute = params[1 + 2*j + 0];
              var value = params[1 + 2*j + 1];
              attributes[attribute] = value;
            }

            // Apply attributes to the target
            var target = $link.closest(selector);
            if (target.length === 0) {
              console.warn('No matching element for selector \'' + selector + '\' for \'attribute\' gimmick');
              return;
            }
            target.attr(attributes);

            // Remove gimmick invocation
            $link.remove();
        });
    }
}(jQuery));
