const path = require('path')
const fs = require('fs')
const lazy = require('lazy.js')

const lazyListOfFiles = lazy(fs.readdirSync(path.resolve(__dirname, '../src/js')))
  .filter(filename => /.[jt]s$/.test(filename))  // remove folders
  .map(filename => {
    const lazySequence = lazy(filename).split('.')
    const name = lazySequence.initial().join('.')
    const extension = lazySequence.last()
    return {
      name,
      extension
    }
  })     // split name and extension

module.exports = lazyListOfFiles
