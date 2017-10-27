import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Chart from './ElevationChart';


class DetailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      elevations: [],
      bounds: [[0, 0], [0, 0]],
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
        elevations.push([item[2], item[3]]);
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
    const selectX = item => item[1] / 1000;
    const selectY = item => item[0];
    return (
      <div>
        <Map points={this.state.points} bounds={this.state.bounds} />
        <Chart
          height={300}
          width="100%"
          data={this.state.elevations}
          selectX={selectX}
          selectY={selectY}
        />
      </div>
    );
  }
}

DetailApp.propTypes = {
  trackId: PropTypes.number.isRequired,
};

export default DetailApp;
