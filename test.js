const path = require('path')
const fs = require('fs')
const createLighthouse = require('.')

exports.handler = function (event, context, callback) {
  Promise.resolve()
    .then(() => createLighthouse(event.url || 'https://example.com', { logLevel: 'info' }))
    .then(({ chrome, results }) => {
      if (event.saveResults) {
        const filename = results.lhr.lighthouseVersion.split('-')[0]
        fs.writeFileSync(path.join(__dirname, `results/${filename}.json`), `${JSON.stringify(results.lhr, null, 2)}\n`)
        fs.writeFileSync(path.join(__dirname, `results/${filename}.html`), results.report)
      }
      return chrome.kill().then(() => callback(null, {
        url: results.lhr.requestedUrl,
        timing: results.lhr.timing,
        userAgent: results.lhr.userAgent,
        lighthouseVersion: results.lhr.lighthouseVersion
      }))
    })
    .catch((error) => {
      return chrome.kill().then(() => callback(error))
    })
    .catch(callback)
}
