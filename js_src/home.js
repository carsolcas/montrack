import 'materialize-css';
import Masonry from 'masonry-layout';

$('.button-collapse').sideNav();
$('.parallax').parallax();

let msnry = new Masonry( '.grid', {
  itemSelector: '.grid-item',
  columnWidth: 200
});