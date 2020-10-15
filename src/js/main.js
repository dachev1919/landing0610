// Pageup
$(window).scroll(function () {
    if ($(this).scrollTop() > 1600){
        $('.pageup').fadeIn();
    }else {
        $('.pageup').fadeOut();
    }
});
//Smooth scroll
$(document).ready(function(){
    $("a[href*=#]").on("click", function(e){
        const anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
    });
});