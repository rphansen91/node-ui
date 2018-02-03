class Component {
  constructor (props) {
    this.props = props
    this.state = {}
  }

  componentDidMount () {}

  componentDidUnmount () {}

  setState (state) {
    Object.assign(this.state, state);
    this.changed();
  }

  render () {
    throw new Error(`"${this.constructor.name}" did not implement render function`)
  }
}

Component.create = function (props) {
  const creater = () => new this(props)
  creater.__node_ui__ = true
  return creater
}

module.exports = Component
