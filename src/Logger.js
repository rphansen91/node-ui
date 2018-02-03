const { flow } = require('lodash')
const chalk = require('chalk')

function passMessage (message) {
  if (typeof message === 'string') return { message }
  if (typeof message === 'number') return { message }
  return message
}

function error ({ message, stack }) {
  console.log('\n🛑 ' + chalk.red(message))
  if (stack) console.log(stack)
}

function warning ({ message }) {
  console.log('\n⚠️ ' + chalk.yellow(message))
}

function log ({ message }) {
  console.log(message)
}

module.exports = {
  error: flow(passMessage, error),
  warning: flow(passMessage, warning),
  log: flow(passMessage, log)
}
