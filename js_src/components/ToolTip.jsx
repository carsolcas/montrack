import React from 'react';
import PropTypes from 'prop-types';
import { line as d3Line } from 'd3-shape';

const ToolTip = ({
  xScale, yScale, xPoint, yPoint, yDomain, xLabel, yLabel,
}) => {
  if (xPoint === undefined) return null;

  const line = d3Line()
    .x(xScale)
    .y(yScale);

  const linePoints = [[yDomain[0], xPoint], [yDomain[1], xPoint]];
  const linePath = line(linePoints);
  const x = xScale(linePoints[0]);
  const y = yScale(linePoints[1]);

  return (
    <g className="vert-line">
      <path d={linePath} />
      <rect fill="white" x={x} y={y} width="100" height="40" />

      <text id="tooltip-text-altitude" x={x + 10} y={y + 15} width="100" height="13">
        <tspan className="title">{xLabel}: </tspan>
        <tspan className="value">{xPoint} km</tspan>
      </text>

      <text id="tooltip-text-altitude" x={x + 10} y={y + 33} width="100" height="13">
        <tspan className="title">{yLabel}: </tspan>
        <tspan className="value">{yPoint} m</tspan>
      </text>
    </g>);
};

ToolTip.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  xPoint: PropTypes.number,
  yPoint: PropTypes.number,
  yDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

ToolTip.defaultProps = {
  xPoint: undefined,
  yPoint: undefined,
  xLabel: 'X' ,
  yLabel: 'Y' ,
};

export default ToolTip;
