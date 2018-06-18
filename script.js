$(function () {
    var selectedClass = "";
    $(".fil-cat").click(function () {
        selectedClass = $(this).attr("data-rel");
        $("#portfolio").fadeTo(100, 0.1);
        $("#portfolio div").not("." + selectedClass).fadeOut().removeClass('scale-anm');
        setTimeout(function () {
            $("." + selectedClass).fadeIn().addClass('scale-anm');
            $("#portfolio").fadeTo(300, 1);
        }, 300);

    });
});


/* Credits: 
 * https://www.developphp.com/video/JavaScript/Circular-Progress-Loader-Canvas-JavaScript-Programming-Tutorial
 */

(function () {

    var Progress = function (element) {

        this.context = element.getContext("2d");
        this.refElement = element.parentNode;
        this.loaded = 0;
        this.start = 4.72;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.total = parseInt(this.refElement.dataset.percent, 10);
        this.timer = null;

        this.diff = 0;

        this.init();
    };

    Progress.prototype = {
        init: function () {
            var self = this;
            self.timer = setInterval(function () {
                self.run();
            }, 25);
        },
        run: function () {
            var self = this;

            self.diff = ((self.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
            self.context.clearRect(0, 0, self.width, self.height);
            self.context.lineWidth = 10;
            self.context.fillStyle = "#000";
            self.context.strokeStyle = "#f4ead9";
            self.context.textAlign = "center";

            self.context.fillText(self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width);
            self.context.beginPath();
            self.context.arc(35, 35, 30, self.start, self.diff / 10 + self.start, false);
            self.context.stroke();

            if (self.loaded >= self.total) {
                clearInterval(self.timer);
            }

            self.loaded++;
        }
    };

    var CircularSkillBar = function (elements) {
        this.bars = document.querySelectorAll(elements);
        if (this.bars.length > 0) {
            this.init();
        }
    };

    CircularSkillBar.prototype = {
        init: function () {
            this.tick = 25;
            this.progress();

        },
        progress: function () {
            var self = this;
            var index = 0;
            var firstCanvas = self.bars[0].querySelector("canvas");
            var firstProg = new Progress(firstCanvas);



            var timer = setInterval(function () {
                index++;

                var canvas = self.bars[index].querySelector("canvas");
                var prog = new Progress(canvas);

                if (index == self.bars.length) {
                    clearInterval(timer);
                }

            }, self.tick * 100);

        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        var circularBars = new CircularSkillBar("#bars .bar");
    });

})();


$(document).ready(function ($) {
    $.fn.menumaker = function (options) {
        var flexmenu = $(this),
            settings = $.extend({
                format: 'dropdown',
                sticky: false
            }, options);
        return this.each(function () {
            $(this).find('.button').on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === 'dropdown') {
                        mainmenu.find('ul').show();
                    }
                }
            });
            flexmenu.find('li ul').parent().addClass('has-sub');
            subToggle = function () {
                flexmenu.find('.has-sub').prepend('<span class="submenu-button"></span>');
                flexmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle')
                subToggle();
            else
                flexmenu.addClass('dropdown');
            if (settings.sticky === true)
                flexmenu.css('position', 'fixed');
            resizeFix = function () {
                var mediasize = 768;
                if ($(window).width() > mediasize) {
                    flexmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    flexmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };

    $('#flexmenu').menumaker({
        format: 'multitoggle'
    });

}(jQuery));
