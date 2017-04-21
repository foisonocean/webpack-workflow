const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

const lazyEntryList = require('./generateEntries')
const listOfHtmlWebpackPlugins = require('./generateHtmlEntries')

const extractCSS = new ExtractTextPlugin('stylesheets/[name].css')

const config = {
  devtool: false,
  entry: lazyEntryList.reduce((result, { name, extension }) => Object.assign(
    {},
    result,
    {
      [name]: extension === 'js'
      ? [
        'babel-polyfill',
        path.resolve(__dirname, `../src/js/${name}.${extension}`)
      ]
      : path.resolve(__dirname, `../src/js/${name}.${extension}`)
    }
  ), {}),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src/js')
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: path.resolve(__dirname, '../src/js')
      },
      {
        test: /\.css$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader'
        ])
      }
    ]
  },
  plugins: listOfHtmlWebpackPlugins.concat([
    extractCSS,
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]),
  stats: 'minimal'
}

module.exports = config
