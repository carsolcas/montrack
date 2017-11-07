import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import MontrackIcon from './Icon';
import MontrackMarker from './Marker';

const zoomLevel = 12;

class MontrackMap extends Component {
  componentDidUpdate() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.fitBounds(this.props.bounds);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(ev) {
    const { points, onSelectedPointChange } = this.props;
    const { latlng } = ev;
    const pointLat = latlng.lat.toFixed(4);
    const pointLng = latlng.lng.toFixed(4);
    const margin = 0.001;

    const pointIndex = points.findIndex((el) => {
      const lat = el[0].toFixed(4);
      const lng = el[1].toFixed(4);
      return (Math.abs(lat - pointLat) <= margin && Math.abs(lng - pointLng) <= margin);
    });
    onSelectedPointChange(pointIndex);
  }

  render() {
    const handleOnClick = ev => this.handleOnClick(ev);

    const { points, selectedPoint, categoryIcon } = this.props;
    const point = (selectedPoint !== undefined) ? points[selectedPoint] : null;
    const mark = (<MontrackMarker point={point} iconURL={categoryIcon} />);

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

          <Polyline
            positions={points}
            color="#8bc34a"
            onClick={handleOnClick}
          />
          {mark}
        </Map>
      </div>
    );
  }
}

MontrackMap.propTypes = {
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onSelectedPointChange: PropTypes.func.isRequired,
  selectedPoint: PropTypes.number,
  categoryIcon: PropTypes.string.isRequired,
};

MontrackMap.defaultProps = {
  selectedPoint: undefined,
};

export default MontrackMap;
