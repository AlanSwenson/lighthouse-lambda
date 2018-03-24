const chromeLauncher = require('chrome-launcher')
const lighthouse = require('lighthouse')
const chromeConfig = require('./chromeConfig')

module.exports = function createLighthouse (url, options = {}, config) {
  const log = options.logLevel ? require('lighthouse-logger') : null
  if (log) {
    log.setLevel(options.logLevel)
  }
  const chromeFlags = chromeConfig.flags.concat(options.chromeFlags || [])
  const chromePath = chromeConfig.binary.filePath
  return chromeLauncher.launch({ chromeFlags, chromePath })
    .then((chrome) => {
      options.port = chrome.port
      return {
        chrome,
        log,
        start () {
          return lighthouse(url, options, config)
            .then((results) => {
              delete results.artifacts
              return results
            })
        }
      }
    })
}
