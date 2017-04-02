import 'materialize-css';

$('.button-collapse').sideNav();

$('.carousel').carousel();
$('.scrollspy').scrollSpy();

$(document).ready(function(){
    var topOffset;
    topOffset = $('nav').height() + $('.parallax-container').height();
    $('.toc-wrapper').pushpin({
        top: topOffset,
    });
});