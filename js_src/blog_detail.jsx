import 'materialize-css';
import React from 'react';
import ReactDOM from 'react-dom';
import DetailApp from './components/DetailApp';

$('.button-collapse').sideNav();

$('.carousel').carousel();
$('.scrollspy').scrollSpy();
$('.parallax').parallax();

$(document).ready(() => {
  const topOffset = $('nav').height() + $('.parallax-container').height();
  $('.toc-wrapper').pushpin({
    top: topOffset,
  });
});

ReactDOM.render(<DetailApp trackId={trackId} icon={icon} />, document.getElementById('map'));
