import React from 'react';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
let position = [0, 0];
const zoomLevel = 12;

export default ({points}) =>{
  if (points.length != 0){
    position = points[0];
  }

  return (
      <div>
        <Map
          center={position}
          zoom={zoomLevel}>

          <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
          <Marker position={position}>
            <Popup>
              <span>Track</span>
            </Popup>
          </Marker>
          <Polyline positions={points} color={'red'} />
        </Map>
      </div>
  )
}
