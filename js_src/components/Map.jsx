import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const zoomLevel = 12;

class MontrackMap extends Component {
  componentDidUpdate() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.fitBounds(this.props.bounds);
  }

  render() {
    const { points, selectedPoint } = this.props;
    let mark;
    if (selectedPoint !== undefined) {
      const point = points[selectedPoint];
      mark = (<Marker position={point} />);
    }
    return (
      <div>
        <Map
          ref={(m) => { this.leafletMap = m; }}
          zoom={zoomLevel}
        >

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={points} color="#8bc34a" />
          {mark}
        </Map>
      </div>
    );
  }
}

MontrackMap.propTypes = {
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  selectedPoint: PropTypes.number,
};

MontrackMap.defaultProps = {
  selectedPoint: undefined,
};

export default MontrackMap;
