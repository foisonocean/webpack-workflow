const path = require('path')
const fs = require('fs')
const lazy = require('lazy.js')

const lazyListOfFiles = lazy(fs.readdirSync(path.resolve(__dirname, '../src/js')))
  .filter(filename => /.js$/.test(filename))  // remove folders
  .map(filename => filename.slice(0, -3))     // remove filename extension '.js'

module.exports = lazyListOfFiles
