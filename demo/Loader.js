const { Component } = require('../')
const { times, constant } = require('lodash')
const chalk = require('chalk')

function percent (max, count) {
  return Math.floor(Math.min(count, max) / max * 100)
}

function loader (max, count) {
  return times(max, (i) => constant((i < count) ? '=' : '_')()).join('')
}

module.exports = class Time extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  tick () {
    const count = this.state.count+1
    this.setState({ count })
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentDidUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { title, max=100 } = this.props
    const { count } = this.state
    return chalk`
{green ${title}}
{bold ${percent(max, count)}%} ${loader(max, count)}`
  }
}
