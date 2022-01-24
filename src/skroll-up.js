$(document).ready(function () {
     $('#raketa-js').fadeOut();
            $(window).scroll(function() {
                if ($(this).scrollTop() > 300) {
                    $('#raketa-js').fadeIn();
                } else {
                    $('#raketa-js').fadeOut();
                }
            });
$("#raketa-js").on("click","a", function (event) {
        event.preventDefault();
        const id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1300);
    });
        });