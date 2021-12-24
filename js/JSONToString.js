const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, '..', 'data', 'JSONToString', 'sample.json'), 'utf-8', (error, data) => {
  if (error) { return console.log(`error`, error) }

  // console.log(`data`, data)
  data = data.replace(/ /g, '')
  // console.log(`data`, data)
  data = data.replace('\n', '')
  console.log(`data`, data)
})