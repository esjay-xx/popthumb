// 
// Pop Thumb $ plugin - displayes zoomed image thumb
// (c) 2008 Dmitry Afanasiev
// 

(function($) {
    $.fn.popthumb = function(options) {
        
        var options = $.extend({
            event: 'mouseover',
            speed: 1000,
            detailed_dir: 'detailed',
            quickOut: false
        }, options || {});
        
        // current zoomed image
        var cur_img = '';
        
        $.fn.stopAndHide = function() {
            return this.each(function() {
                var popthumb = $(this);
                popthumb.stop();
                popthumb.hide();
                popthumb.css({
                  width: '',
                  height: ''
                });
            });
        }

        // append popthumb img if it is not already exists
        $("body").append('<a href="#"><img id="popthumb" src="" alt="" /></a>');
        var popthumb = $("#popthumb");
        var a_popthumb = popthumb.parent();
        popthumb.css({
           position: 'absolute',
           display: 'block' 
        });
        
        popthumb.mouseout(function() {
            var speed = options.quickOut ? options.speed / 2 : options.speed;
            var position = cur_img.position();
            popthumb.animate({
               width: cur_img.width(),
               height: cur_img.height(),
               left: position.left + 'px',
               top: position.top   + 'px'
            }, speed, 'linear', function() {
                popthumb.stopAndHide();
            });
        });

        return this.each(function() {
           var img = $(this);
           img.bind(options.event, function() {
                popthumb.stopAndHide();
                
                var parent = img.parent(); 
                cur_img = img;
                
                popthumb.attr('src', 
                    options.detailed_dir + '/' + img.attr('src'));
                popthumb.attr('alt', parent.attr('alt'));
                a_popthumb.attr('href', parent.attr('href'));
                
                var popWidth = popthumb.width();
                var popHeight = popthumb.height();
                
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
                   left: (Math.round(position.left - (popWidth - imgWidth) / 2)) + 'px',
                   top: (Math.round(position.top - (popHeight - imgHeight) / 2)) + 'px'
                }, options.speed);

                return false;
           });
        });
    }  
}) (jQuery);