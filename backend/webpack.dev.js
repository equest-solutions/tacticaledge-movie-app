const path = require('path');
// const webpack = require('webpack');

module.exports = {
  entry: {
    main: './app.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    clean: true
  },
  mode: 'development',
  target: 'node',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
