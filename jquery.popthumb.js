// 
// Pop Thumb jQuery plugin - displayes zoomed image thumb
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
        var curImg = '';

        // append popthumb img if it is not already exists
        $("body").append('<a href="#"><img id="popthumb" src="" alt="" /></a>');
        var popthumb = $("#popthumb");
        var a_popthumb = popthumb.parent();
        popthumb.css({
           position: 'absolute',
           display:  'block' 
        });
        
        popthumb.stopAndHide = function() {
            this.stop();
            this.hide();
            this.css({
                width:  '',
                height: ''
            });  
        };
        
        popthumb.mouseout(function() {
            var speed = options.quickOut ? options.speed / 2 : options.speed;
            var position = curImg.position();
            popthumb.animate({
               width: curImg.width(),
               height: curImg.height(),
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
                curImg = img;
                
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
                    top:  position.top  + 'px' 
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