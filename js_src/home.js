import 'materialize-css';
import Masonry from 'masonry-layout';

$('.button-collapse').sideNav();
$('.parallax').parallax();

const msnry = new Masonry('.grid', {
  itemSelector: '.grid-item',
  columnWidth: 100,
});
