import 'materialize-css';
import Masonry from 'masonry-layout';

$('.button-collapse').sideNav();

let msnry = new Masonry( '.grid', {
  itemSelector: '.grid-item',
  columnWidth: 200
});