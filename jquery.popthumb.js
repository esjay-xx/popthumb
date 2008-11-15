// 
// Pop Thumb $ plugin - displayes zoomed image thumb
// (c) 2008 Dmitry Afanasiev
// 

(function($) {
    $.fn.popthumb = function(options) {
        
        var options = $.extend({
            speed: 1000,
            detailed_dir: 'detailed',
        }, options);

        // append popthumb img if it is not already exists
        $("#i-body").append('<a href="#"><img id="popthumb" src="" alt="" /></a>');
        var popthumb = $("#popthumb");
        var a_popthumb = popthumb.parent();
        popthumb.css({
           position: 'absolute',
           display: 'block' 
        });
        
        // popthumb.mouseout(function() {
        //    popthumb.hide(); 
        // });

        return this.each(function() {
           $(this).mouseover(function() {
                var img = $(this);
                popthumb.attr('src', 
                    options.detailed_dir + '/' + img.attr('src'));
                a_popthumb.attr('href', img.parent().attr('href'));
                
                var popWidth = popthumb.width();
                var popHeight = popthumb.height();
                var coef = popWidth / popthumb.height();
                var imgWidth = img.width();
                var imgHeight = img.height();
                popthumb.width(imgWidth);
                popthumb.height(imgHeight);
                var position = img.position();
                
                popthumb.css({
                    left: position.left + 'px',
                    top: position.top   + 'px', 
                });
                
                popthumb.animate({
                   width: popWidth,
                   height: popHeight,
                   left: (position.left - (popWidth - imgWidth) / 2) + 'px',
                   top: (position.top - (popHeight - imgHeight) / 2) + 'px'
                }, options.speed);
                
                popthumb.show();

                return false;
           });
        });
    }  
}) (jQuery);