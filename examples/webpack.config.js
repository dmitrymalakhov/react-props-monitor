/**
 * @author Dmitry Malakhov
 */

'use strict';

const { resolve } = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_PORT = 8090;

const PATH_SOURCES = resolve(__dirname, './');
const PATH_DIST = resolve(__dirname, './', 'public');

module.exports = {
  context: PATH_SOURCES,
  entry: {
    main: './index',
  },
  output: {
    path: PATH_DIST,
    publicPath: '/',
    pathinfo: true,
  },
  profile: false,
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: PATH_DIST,
    port: APP_PORT,
    host: '0.0.0.0',
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true,
    },
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      cache: false,
      minify: false,
    }),
  ],
};
