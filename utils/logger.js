// credit for the colors: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const FgGreen = '\x1b[32m'
const FgRed = '\x1b[31m'
const BgMagenta = '\x1b[45m'
const reset = '\x1b[0m'

function info (...params) {
  console.log(BgMagenta + ' %s ' + reset, ...params)
}

function warn (...params) {
  console.warn(...params)
}

function green (...params) {
  console.log(FgGreen + '%s' + reset, ...params)
}

function red (...params) {
  console.log(FgRed + '%s' + reset, ...params)
}

module.exports = { info, warn, green, red }
