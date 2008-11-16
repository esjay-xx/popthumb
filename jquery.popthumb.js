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
        var popThumb = $("#popthumb");
        var aPopThumb = popThumb.parent();
        popThumb.css({
           position: 'absolute',
           display:  'block' 
        });
        
        popThumb.stopAndHide = function() {
            this.stop();
            this.hide();
            this.css({
                width:  '',
                height: ''
            });
        };
        
        popThumb.mouseout(function() {
            popThumb.stop();
            var speed = options.quickOut ? options.speed / 2 : options.speed;
            var position = curImg.position();
            popThumb.animate({
                width:  curImg.width(),
                height: curImg.height(),
                left: position.left + 'px',
                top:  position.top  + 'px'
            }, speed, 'linear', function() {
                popThumb.stopAndHide();
            });
        });

        return this.each(function() {
           var img = $(this);
           img.bind(options.event, function() {
                popThumb.stopAndHide();
                
                var parent = img.parent(); 
                curImg = img;
                
                popThumb.attr('src', 
                    options.detailed_dir + '/' + img.attr('src'));
                popThumb.attr('alt',   parent.attr('alt'));
                aPopThumb.attr('href', parent.attr('href'));
                
                var popWidth  = popThumb.width();
                var popHeight = popThumb.height();
                
                var imgWidth  = img.width();
                var imgHeight = img.height();
                
                popThumb.width(imgWidth);
                popThumb.height(imgHeight);
                var position = img.position();
                
                popThumb.css({
                    left: position.left + 'px',
                    top:  position.top  + 'px' 
                });
                
                popThumb.animate({
                   width:  popWidth,
                   height: popHeight,
                   left: (Math.round(position.left - (popWidth  - imgWidth)  / 2)) + 'px',
                   top:  (Math.round(position.top  - (popHeight - imgHeight) / 2)) + 'px'
                }, options.speed);

                return false;
           });
        });
    }  
}) (jQuery);