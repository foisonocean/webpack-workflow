const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const lazyEntryList = require('./generateEntries')
const listOfHtmlWebpackPlugins = require('./generateHtmlEntries')

const extractCSS = new ExtractTextPlugin('stylesheets/[name].css')

const config = {
  devtool: false,
  entry: lazyEntryList.reduce((result, name) => Object.assign(
    {},
    result,
    {
      [name]: path.resolve(__dirname, `../src/js/${name}.js`)
    }
  ), {}),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
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
