import { Icon } from 'leaflet';

class MontrackIcon extends Icon {
  constructor(options) {
    super(options);
    this.options = Object.assign({}, this.options, {
      iconSize: [32, 37],
      iconAnchor: [16, 34],
    });
  }
}

export default MontrackIcon;
