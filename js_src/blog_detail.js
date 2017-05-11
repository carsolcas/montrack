import 'materialize-css';
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';

$('.button-collapse').sideNav();

$('.carousel').carousel();
$('.scrollspy').scrollSpy();
$('.parallax').parallax();

$(document).ready(function(){
    var topOffset;
    topOffset = $('nav').height() + $('.parallax-container').height();
    $('.toc-wrapper').pushpin({
        top: topOffset,
    });
});

ReactDOM.render(
  <Map />,
  document.getElementById('map')
);