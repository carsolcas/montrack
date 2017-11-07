import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import MontrackIcon from './Icon';

const getPopup = (text, url) => {
  if (!text) return null;

  const popupText = (url) ? `<a href="${url}">${text}</a>` : text;
  return (<Popup><span>{popupText}</span></Popup>);
};

const MontrackMarker = ({
  point, text, url, iconURL,
}) => {
  if (point == null) return null;

  const popup = getPopup(text, url);
  const props = { position: point };
  if (iconURL) props.icon = new MontrackIcon({ iconUrl: iconURL });

  return (
    <Marker {...props}>
      {popup}
    </Marker>);
};

MontrackMarker.propTypes = {
  point: PropTypes.arrayOf(PropTypes.number),
  url: PropTypes.string,
  text: PropTypes.string,
  iconURL: PropTypes.string,
};

MontrackMarker.defaultProps = {
  point: null,
  text: '',
  url: '',
  iconURL: '',
};

export default MontrackMarker;
