var MYAPP = (function() {
	'use strict';
    var thumbnailSpacing = 10;
    var _startMyApp,
        checkViewport;

    checkViewport = function() {
        console.log('checkViewport');
        var photoW = $('.photos').width();
        var thContainerWidth = $('.thumbnail_container').width();
        var thumbnailWidth = $('.thumbnail_container a.thumbnail:first-child').outerWidth();

        if (photoW < thContainerWidth) {
            positionThumbnails();
        } else if ((photoW - thumbnailWidth) > thContainerWidth) {
            positionThumbnails();
        }
				//positionThumbnails();
        console.log('photosWidth = ' + photoW + ', thContainerWidth ' + thContainerWidth);
        ///* debug */ $('.debug-size').html('photosWidth = ' + photoW + ', thContainerWidth ' + thContainerWidth);
        return;
    };

    _startMyApp = function() {
        //$(document).ready(function()  {
        // implement tab nav behaviour
        $('a.sortLink').on('click', function(e) {
            e.preventDefault();
            $('a.sortLink').removeClass('selected');
            $(this).addClass('selected');
            var keyword = $(this).attr('data-keyword');
            sortThumbnails(keyword);
        });
        $('.gallery .sorting').css('margin-bottom', thumbnailSpacing + 'px');
        //$('.bottomnav .link').css('margin-bottom', thumbnailSpacing + 'px');

        $('.thumbnail_container a.thumbnail')
					.addClass('showMe').addClass('fancybox').attr('rel', 'group');

        $('.thumbnail_container a.thumbnailVideo')
					.addClass('showMe').addClass('fancybox-media').attr('rel', 'group');

        positionThumbnails();

        setInterval(function() {
            return checkViewport();
        }, 750);
        $(".various").fancybox({
            maxWidth: 800,
            maxHeight: 600,
            fitToView: false,
            width: '70%',
            height: '70%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none'
        });

        $('.fancybox-media').fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            helpers: {
                media: {}
            }
        });
    };

    function sortThumbnails(keyword) {
        $('.thumbnail_container a.thumbnail').each(function() {

            var thumbnailKeywords = $(this).attr('data-keywords');
            if (keyword === 'all') {
                $(this).addClass('showMe').removeClass('hideMe').attr('rel', 'group');
            } else {
                if (thumbnailKeywords.indexOf(keyword) !== -1) {
                    $(this).addClass('showMe').removeClass('hideMe').attr('rel', 'group');

                } else {
                    $(this).addClass('hideMe').removeClass('showMe').attr('rel', 'none');
                }

            }
        });

        positionThumbnails();
    }

    function positionThumbnails() {
        console.log('positionThumbnails');
        //$('.debug-remaindner').html('');

        $('.thumbnail_container a.thumbnail.hideMe').animate({
            opacity: 0
        }, 500, function() {
            $(this).css({'display': 'none', 'top': '0px', 'left': '0px'});
        });

        var containerWidth = $('.photos').width();
        var thumbnailRow = 0;
        var thumbnailCol = 0;
        var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + thumbnailSpacing;
        var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + thumbnailSpacing;
        var maxCol = Math.floor(containerWidth / thumbnailWidth);

        $('.thumbnail_container  a.thumbnail.showMe').each(function(index) {
            var remainder = (index % maxCol) / 100;
            var maxIndex = 0;
            if (remainder === 0) {
                if (index !== 0) {
                    thumbnailRow += thumbnailHeight;
                }
                thumbnailCol = 0;
            } else {
                thumbnailCol += thumbnailWidth;
            }
            $(this).css('display', 'block').animate({
                'opacity': 1,
                'top': thumbnailRow + 'px',
                'left': thumbnailCol + 'px'
            }, 500);

            var newW = maxCol * thumbnailWidth;
            var newH = thumbnailRow + thumbnailHeight;
            $('.thumbnail_container').css({
                'width': newW + 'px',
                'height': newH + 'px'
            });
        });
        detectFancyBoxLinks();
        //$('.sorting').css({'width': newW + 'px', 'height': newH + 'px'});

        var sortingWidth = $('.thumbnail_container').width() / thumbnailWidth;
        var newWidth = sortingWidth * thumbnailWidth - thumbnailSpacing;

        //var newWidth = $('.thumbnail_container').width()  - - thumbnailSpacing;

        $('.sorting').css({
            'width': newWidth + 'px'
        });
    }

    function detectFancyBoxLinks() {
        console.log('detectFancyBoxLinks');
        // remove all intances of click events previously assigned
        $('a.fancybox').unbind('click.fb');
        $('a.fancybox-media').unbind('click.fb');

        var thumbnailObj = $('.thumbnail_container a.thumbnail');
        if ($(window).width() < 550) {
            // remove fancybox class and have photo target to a new window
            thumbnailObj.removeClass('fancybox').attr('target', '_blank');
        } else {
            //
            thumbnailObj.removeAttr('target');
            //???
            thumbnailObj.addClass('fancybox');
            //$('a.fancybox').fancybox();
        }

        // add light box functionality
        //quotes not needed?
        $('a.fancybox[rel="group"]').fancybox({
            transitionIn: 'elastic',
            transitionOut: 'elastic',
            titlePosition: 'over',
            openSpeed: 500,
            overlayColor: '#000',
            padding: 0,
            overlayOpacity: 75,

            helpers: {
                media: {}
            }
            /* // full screen funcitonality
			,
			afterShow		: function() {
		        $('<div class="expander"></div>').appendTo(this.inner).click(function() {
		            $(document).toggleFullScreen();
		        });
		    },
		    afterClose		: function() {
		        $(document).fullScreen(false);
		    }
		    */

        });

    }
    return {startMyApp: _startMyApp};
})();
