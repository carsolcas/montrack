import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Chart from './ElevationChart';

const selectY = item => item[0];
const selectX = item => item[1];

class DetailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      elevations: [],
      bounds: [[0, 0], [0, 0]],
      selectedPoint: undefined,
    };
  }

  componentWillMount() {
    const that = this;
    const url = `/api/track/${this.props.trackId}/`;

    $.get(url, (data) => {
      const points = [];
      const elevations = [];
      let minLat;
      let minLng;
      let maxLat;
      let maxLng;

      if (data && data.points) {
        const firstPoint = data.points[0];
        [minLat, minLng] = firstPoint;
        [maxLat, maxLng] = firstPoint;
      }
      data.points.map((item) => {
        points.push([item[0], item[1]]);
        const dist = (item[3] / 1000).toFixed(2);
        const elev = item[2].toFixed(0);
        elevations.push([+elev, +dist]);
        minLat = Math.min(minLat, item[0]);
        minLng = Math.min(minLng, item[1]);
        maxLat = Math.max(maxLat, item[0]);
        maxLng = Math.max(maxLng, item[1]);
        return 0;
      });
      const bounds = [[minLat, minLng], [maxLat, maxLng]];
      that.setState({ points, bounds, elevations });
    });
  }

  render() {
    const {
      points, bounds, elevations, selectedPoint,
    } = this.state;

    const handleSelectedPointChange = p => this.setState({ selectedPoint: p });

    return (
      <div>
        <Map
          points={points}
          bounds={bounds}
          selectedPoint={selectedPoint}
          onSelectedPointChange={handleSelectedPointChange}
        />

        <Chart
          height={300}
          width="100%"
          data={elevations}
          selectX={selectX}
          selectY={selectY}
          selectedPoint={selectedPoint}
          onSelectedPointChange={handleSelectedPointChange}
        />
      </div>
    );
  }
}

DetailApp.propTypes = {
  trackId: PropTypes.number.isRequired,
};

export default DetailApp;
