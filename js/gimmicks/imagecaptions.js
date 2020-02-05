(function($){
    'use strict';
    var imageCaptionsGimmick = {
        name: 'imagecaptions',
        once: function() {
            $.md.linkGimmick(this, 'imagecaptions', imageCaptions);
        }
    };
    $.md.registerGimmick(imageCaptionsGimmick);

    function imageCaptions($links, opt, href) {
        return $links.each(function(i,link) {
            var $link = $(link);
            var param = $link.attr('href');

            // Remove gimmick invocation
            $link.remove();

            // Only do this once to avoid weird bugs
            if (i > 0) {
              return;
            }

            var images = $('.md-image-group');
            var individualImageCols = images.children().not('.md-text');

            individualImageCols.each(function (index) {
              var column = $(this);
              var image = column.find('img');
              console.log(image);
              var caption = image.attr('title');

              column.append('<div class="md-image-caption text-muted">' + caption + '</div>');
            });
        });
    }
}(jQuery));
