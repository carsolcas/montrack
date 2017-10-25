const webpack = require('webpack');
const path = require('path');

const PATHS = {
  source: path.join(__dirname, 'js_src'),
  build: path.join(__dirname, 'montrack/montrack/static/js'),
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],

  entry: {
    home: path.join(PATHS.source, 'home.js'),
    blog_detail: path.join(PATHS.source, 'blog_detail.jsx'),
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};
