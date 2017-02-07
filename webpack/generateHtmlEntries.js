const path = require('path')
const fs = require('fs')
const lazy = require('lazy.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const listOfHtmlWebpackPlugins = lazy(fs.readdirSync(path.resolve(__dirname, '../src')))
  .filter(filename => /.html$/.test(filename))  // remove floders
  .map(filename => filename.slice(0, -5))     // remove filename extension '.html'
  .map(name => new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: path.resolve(__dirname, `../src/${name}.html`),
    inject: true,
    chunks: [name]
  }))
  .toArray()

module.exports = listOfHtmlWebpackPlugins
