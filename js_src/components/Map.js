import React from 'react';

const points = [
  {
    lat:40.2,
    lon:0.1
  },
  {
    lat: 40.5542,
    lon: 0.1258
  }
];

export default () => (
  <ul>{points.map(point=>
    <li>{point.lat} - {point.lon} </li>
  )}</ul>
)