/*
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssCssnext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV || 'prod'

function plugins() {
  if(env === 'prod'){
    return [
      new ExtractTextPlugin('style.css', { allChunks: true }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production')} }),
      new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ]
  }
  return [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({ title: 'Example', template: './index.html' })
  ]
}
*/

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./index.js'],
  devtool: 'inline-source-map',
  output: { filename: 'bundle.js', publicPath: '' },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/react'] } } ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'react webpack example', template: './index.html' })
  ],
}
