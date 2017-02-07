const path = require('path')
const webpack = require('webpack')

const lazyEntryList = require('./generateEntries')
const listOfHtmlWebpackPlugins = require('./generateHtmlEntries')

const config = {
  devtool: 'source-map',
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
      }
    ]
  },
  plugins: listOfHtmlWebpackPlugins.concat([
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
