const { isFunction, isString, isNumber, isBoolean } = require('lodash')
const chalk = require('chalk')

function string (str) {
  return `\n${str}`
}

function boolean (bool) {
  if (!bool) return chalk`\n{red ${bool}}`
  return chalk`\n{blue ${bool}}`
}

function number (num) {
  return chalk`\n{green ${num}}`
}

function object (obj) {
  return `\n${JSON.stringify(obj)}`
}

module.exports = function render (cmp) {
  if (isString(cmp)) return string(cmp)
  if (isBoolean(cmp)) return boolean(cmp)
  if (isNumber(cmp)) return number(cmp)
  if (isFunction(cmp)) return render(cmp())
  return object(cmp)
}
