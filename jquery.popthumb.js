// 
// Pop Thumb $ plugin - displayes zoomed image thumb
// (c) 2008 Dmitry Afanasiev
// 

(function($) {
    $.fn.popthumb = function(options) {
        
        var options = $.extend({
            detailed_dir: 'detailed'
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
                
                var popWidth  = popthumb.width();
                var popHeight = popthumb.height();
                var imgWidth  = img.width();
                var imgHeight = img.height();
                
                popthumb.width(imgWidth);
                popthumb.height(imgHeight);
                
                var curPopWidth  = popthumb.width();
                var curPopHeight = popthumb.height();
                
                var position = img.position();
            
                while (curPopWidth < popWidth) {
                    curPopWidth  += 2;
                    curPopHeight += 2;
                    
                    popthumb.width(curPopWidth);
                    popthumb.height(curPopHeight);
                    
                    position = {
                        left: (position.left - 1),
                        top: (position.top   - 1)
                    }
                    
                    popthumb.css({
                        left: position.left + 'px',
                        top: position.top   + 'px', 
                    });
                }

                popthumb.show();

               return false;
           });
        });
    }  
}) (jQuery);