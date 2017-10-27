import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extent as d3ArrayExtent } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { line as d3Line, area as d3Area } from 'd3-shape';
import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
} from 'd3-axis';
import { select as d3Select } from 'd3-selection';


class ElevationChart extends Component {
  constructor(props) {
    super(props);
    this.svgHeight = 0;
    this.svgWidth = 0;
  }

  componentDidMount() {
    this.svgWidth = this.containerChart.offsetWidth;
    this.svgHeight = this.containerChart.offsetHeight;
  }

  getSvgCoords(x, y) {
    const svg = this.svgChart;
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  showToolTip(e, a, c) {
    const { margin } = this.props;
    const pos = this.getSvgCoords(e.clientX, e.clientY);
    if (pos.x < margin.left || pos.x > this.svgWidth - margin.right) return;

    const km = this.xScale.invert(pos.x - margin.left);
    console.log(km);
  }

  render() {
    const {
      data, selectX, selectY, margin,
    } = this.props;

    const width = this.svgWidth - margin.left - margin.right;
    const height = this.svgHeight - margin.top - margin.bottom;


    this.xScale = d3ScaleLinear()
      .domain(d3ArrayExtent(data, selectX))
      .range([0, width]);

    this.yScale = d3ScaleLinear()
      .domain(d3ArrayExtent(data, selectY))
      .range([height, 0]);

    const { xScale, yScale } = this;
    const selectScaledX = datum => xScale(selectX(datum));
    const selectScaledY = datum => yScale(selectY(datum));

    const xAxis = d3AxisBottom()
      .scale(xScale);

    const yAxis = d3AxisLeft()
      .scale(yScale)
      .ticks(4);

    const areaChart = d3Area()
      .x(selectScaledX)
      .y0(height)
      .y1(selectScaledY);

    const areaPath = areaChart(data);

    const translateX = `translate(0, ${height})`;
    const translateContainer = `translate(${margin.left}, ${margin.top})`;

    return (
      <div
        className="elevation-chart-container"
        ref={(input) => { this.containerChart = input; }}
      >
        <svg
          ref={(input) => { this.svgChart = input; }}
          width="100%"
          height="100%"
          className="elevation-chart"
          onMouseMove={this.showToolTip.bind(this)}
        >
          <g height={height} className="chart-container" transform={translateContainer}>
            <g className="xAxis" transform={translateX} ref={node => d3Select(node).call(xAxis)} />
            <g className="yAxis" ref={node => d3Select(node).call(yAxis)} />
            <g
              className="area"
            >
              <path d={areaPath} />
            </g>
          </g>

        </svg>
      </div>
    );
  }
}

ElevationChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectX: PropTypes.func.isRequired,
  selectY: PropTypes.func.isRequired,
  margin: PropTypes.objectOf(PropTypes.number),
};

ElevationChart.defaultProps = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 50,
  },
};

export default ElevationChart;
