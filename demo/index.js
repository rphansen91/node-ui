const { NodeUi } = require('../')
const cliApply = require('cli-apply')
const Title = require('./Title')
const Time = require('./Time')
const Loader = require('./Loader')
const Jedis = require('./Jedis')
const Ticker = require('./Ticker')

startDemo()

function startDemo () {
  console.log(Title())
  console.log('Which demo whould you like to see?')
  cliApply({
    'Loader Demo': loaderDemo,
    'Time Demo': timeDemo,
    'Star Wars Demo': swarsDemo,
    'Crypto Ticker Demo': cryptoDemo,
    'String Demo': stringDemo,
    'Boolean Demo': booleanDemo,
    'Number Demo': numberDemo,
    'Object Demo': objectDemo,
    'Array Demo': arrayDemo,
    'Function Demo': functionDemo
  })
  .then(renderUi)
}

function stringDemo () {
  return ['Render Strings', 'Hello World', '']
}

function booleanDemo () {
  return ['Render Booleans', true, false, '']
}

function numberDemo () {
  return ['Render Numbers', 1203, '']
}

function objectDemo () {
  return ['Render Objects', { a: '1', b: '2' }, '']
}

function arrayDemo () {
  return ['Render Arrays', [1,2,3], '']
}

function functionDemo () {
  return function RandomFloat () {
    return Math.random()
  }
}

function loaderDemo () {
  return Loader.create({ title: 'Loader' })
}

function timeDemo () {
  return Time.create({ title: 'Current Time' })
}

function swarsDemo () {
  return Jedis.create()
}

function cryptoDemo () {
  return Ticker.create({ symbols: ['BTC', 'ETH', 'LTC', 'BCH'] })
}

function renderUi (cmps) {
  var ui = NodeUi([].concat(cmps))
  ui.init()
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.once('data', handleKey)

  function handleKey () {
    ui.remove()
    startDemo()
  }
}


