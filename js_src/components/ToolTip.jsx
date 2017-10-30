import React from 'react';
import PropTypes from 'prop-types';
import { line as d3Line } from 'd3-shape';

const ToolTip = ({
  xScale, yScale, xPoint, yPoint, yDomain,
}) => {
  if (xPoint === undefined) return null;

  const line = d3Line()
    .x(xScale)
    .y(yScale);

  const linePoints = [[yDomain[0], xPoint], [yDomain[1], xPoint]];
  const linePath = line(linePoints);
  return (<g className="vert-line"><path d={linePath} /></g>);
};

ToolTip.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  xPoint: PropTypes.number,
  yPoint: PropTypes.number,
  yDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
};

ToolTip.defaultProps = {
  xPoint: undefined,
  yPoint: undefined,
};

export default ToolTip;
