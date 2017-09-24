/**
 * @author Dmitry Malakhov
 */

'use strict';

const { resolve } = require('path'),
  webpack = require('webpack');

const PATH_SOURCES = resolve(__dirname, './src');
const PATH_DIST = resolve(__dirname, './', 'lib');

module.exports = {
  context: PATH_SOURCES,
  entry: {
    index: './index',
  },
  output: {
    path: PATH_DIST,
    publicPath: '/',
    filename: '[name].js',
    pathinfo: true,
  },
  profile: false,
  performance: {
    hints: false,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
