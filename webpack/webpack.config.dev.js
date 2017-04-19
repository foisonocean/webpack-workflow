const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')

const { devServerPort } = require('./constant')
const lazyEntryList = require('./generateEntries')
const listOfHtmlWebpackPlugins = require('./generateHtmlEntries')

const config = {
  devtool: 'source-map',
  entry: lazyEntryList.reduce((result, { name, extension }) => Object.assign(
    {},
    result,
    {
      [name]: [
        `webpack-dev-server/client?http://0.0.0.0:${devServerPort}`,
        path.resolve(__dirname, `../src/js/${name}.${extension}`)
      ]
    }
  ), {}),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
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
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap'
        ]
      }
    ]
  },
  plugins: listOfHtmlWebpackPlugins.concat([
    new CheckerPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ]),
  devServer: {
    host: '0.0.0.0',
    port: devServerPort,
    compress: true,
    contentBase: path.resolve(__dirname, '../static'),
    stats: 'minimal'
  }
}

module.exports = config
