const webpack = require("webpack");
const path = require('path');

const PATHS = {
  source: path.join(__dirname, 'js_src'),
  build: path.join(__dirname, 'montrack/montrack/static/js'),
};

module.exports = {
  resolve: {
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
    blog_detail: path.join(PATHS.source, 'blog_detail.js'),
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
};
