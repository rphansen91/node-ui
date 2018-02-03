const { Component } = require('../')
const chalk = require('chalk')

function currentTime () {
  return new Date().toLocaleTimeString()
}

module.exports = class Time extends Component {
  constructor (props) {
    super(props)
    this.state = {
      time: currentTime()
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      const time = currentTime()
      this.setState({ time })
    }, 1000)
  }

  componentDidUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { title } = this.props
    const { time } = this.state
    return chalk`
{green ${title}}
${time}`
  }
}
