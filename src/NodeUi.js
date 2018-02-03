const clear = require('clear')
const Render = require('./Render')
const { isFunction, identity } = require('lodash')
const { log, warning, error } = require('./Logger')

module.exports = function NodeUi (children) {
  let mounted = false
  let cmps = []

  function init () {
    mounted = true
    addAllComponents(children)
    render()
  }

  function output () {
    return cmps.map(cmp => {
      if (isFunction(cmp.render)) return cmp.render()
      return cmp
    }).join('')
  }

  function render () {
    if (!mounted) return warning('You tried to render an unmounted component')

    Promise.resolve()
    .then(clear)
    .then(output)
    .then(log)
    .catch(error)
  }

  function addAllComponents (children) {
    Promise.resolve()
    .then(() => {
      [].concat(children)
      .map(addComponent)
      .forEach(cmp => cmps.push(cmp))
    })
    .catch(error)
  }

  function addComponent (child) {
    if (isFunction(child) && child.__node_ui__) {
      const cmp = child();
      cmp.changed = render;
      (cmp.componentDidMount || identity).call(cmp);
      return cmp
    }

    return Render(child)
  }

  function remove () {
    cmps.forEach(cmp => {
      (cmp.componentDidUnmount || identity).call(cmp)
    })
    mounted = false
    cmps = []
    clear()
  }

  function isMounted () {
    return mounted
  }

  return {
    isMounted,
    init,
    remove
  }
}
