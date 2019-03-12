const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function entry (options) {
  if (options.mode === 'production') {
    return './src/server.js'
  }
  return './src/index.js'
}

function externals (options) {
  if (options.mode === 'production') {
    return nodeExternals(options)
  }
  return {}
}

function output (options) {
  if (options.mode === 'production') {
    return { path: path.resolve(__dirname, 'dist'), filename: 'server.js', publicPath: '/' }
  }
  return { filename: 'bundle.js', publicPath: '' }
}

function plugins (options) {
  if (options.mode === 'production') {
    return [
      new webpack.DefinePlugin({'process.env': { NODE_ENV: `'production'` }})
    ]
  }
  return [
    new HtmlWebpackPlugin({ title: 'react webpack example', template: './src/index.html' })
  ]
}

function target (options) {
  if (options.mode === 'production') {
    return 'node'
  }
  return 'web'
}


module.exports = (env, options) => {
  return {
    entry: entry(options),
    externals: externals(options),
    output: output(options),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [ { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/react'] } } ],
          exclude: /node_modules/,
        }
      ]
    },
    plugins: plugins(options),
    target: target(options)
  }
}
