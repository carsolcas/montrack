const webpack = require("webpack");
const path = require('path');

const PATHS = {
  source: path.join(__dirname, 'js_src'),
  build: path.join(__dirname, 'montrack/montrack/static/js'),
};

module.exports = {
  resolve: {
    alias: {
      'materialize': "materialize-css/dist/js/materialize.js"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    })
  ],
  entry: {
    home: path.join(PATHS.source, 'home.js'),
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
};