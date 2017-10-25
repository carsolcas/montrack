import React, { Component } from 'react';
import Map from './Map';


class DetailApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      max_elevation: 0,
      distance: 0,
      points: [],
      bounds: [[0, 0], [0, 0]],
    };
  }

  componentWillMount() {
    const that = this;
    $.get('/api/track/13/', (data) => {
      const points = [];
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
        minLat = Math.min(minLat, item[0]);
        minLng = Math.min(minLng, item[1]);
        maxLat = Math.max(maxLat, item[0]);
        maxLng = Math.max(maxLng, item[1]);
      });
      const bounds = [[minLat, minLng], [maxLat, maxLng]];
      that.setState({ points, bounds });
    });
  }

  render() {
    return (
      <div>
        <Map points={this.state.points} bounds={this.state.bounds} />
      </div>
    );
  }
}

export default DetailApp;
