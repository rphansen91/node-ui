const { Component } = require('../')
const { subscribe } = require('./utils/cc')
const { isNumber } = require('lodash')
const chalk = require('chalk')
const Table = require('cli-table')
const priceOptions = { minimumFractionDigits: 2, maximumFractionigits: 2 }
function formatPrice (num) {
  if (!isNumber(num)) return 0
  return num.toLocaleString(undefined, priceOptions)
}

module.exports = class Ticker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prices: {}
    }
  }

  setPrice (symbol, price) {
    const prices = Object.assign({}, this.state.prices, { [symbol]: price || 0 })
    this.setState({ prices })
  }

  symbols () {
    const { symbol, symbols } = this.props
    return [symbol].concat(symbols).filter(v => v)
  }

  componentDidMount () {
    const symbols = this.symbols()
    this.unsub = subscribe(symbols, ({ FROMSYMBOL, PRICE }) => {
      if (!this.unmmounted && typeof PRICE === 'number') {
        this.setPrice(FROMSYMBOL, PRICE)
      }
    })
  }

  componentDidUnmount () {
    this.unmmounted = true
    this.unsub()
  }

  render () {
    const symbols = this.symbols()
    const { prices } = this.state
    const table = new Table({ head: symbols })
    table.push(
      symbols
      .map(s => prices[s])
      .map(formatPrice)
      .map(p => `$${p}`)
    )
    return chalk`
{green Crypto}
${table.toString()}
    `
  }
}
