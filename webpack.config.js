const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'js_src'),
  build: path.join(__dirname, 'montrack/montrack/static/js'),
};

module.exports = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
};