const path = require('path')

exports.binary = {
  filePath: path.join(__dirname, '../bin/headless-chromium'),
  version: 'stable-64.0.3282.186',
  checksum: {
    algorithm: 'sha256',
    value: 'd29ae3059e9a235241b4c14a246c353a2d1afcd5a8abbf4867d81a7b9dde10f0'
  }
}

exports.flags = [
  '--disable-gpu',
  '--headless',
  '--no-zygote',
  '--no-sandbox',
  '--single-process'
]
