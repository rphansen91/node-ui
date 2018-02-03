const NodeUi = require('./NodeUi')
const Component = require('./Component')

describe('NodeUi', function () {

  test('Should be defined', function () {
    expect(NodeUi).toBeDefined()
  })

  test('Should create ui', function () {
    const ui = NodeUi(['Hello'])
    expect(typeof ui.init).toBe('function')
    expect(typeof ui.remove).toBe('function')
    expect(typeof ui.isMounted).toBe('function')
  })

  test('Should not be mounted until init', function () {
    const ui = NodeUi(['Hello'])
    expect(ui.isMounted()).toBeFalsy()
  })

  test('Should not be mount ui on init', function () {
    const ui = NodeUi(['Hello']).init()
    expect(ui.isMounted()).toBeTruthy()
  })


  test('Should mount component', function () {
    const componentDidMountSpy = jest.fn()
    class Test extends Component {
      componentDidMount () {
        componentDidMountSpy()
      }
      render () {
        return 'Hello'
      }
    }
    const ui = NodeUi(['Test Mount', Test.create()]).init()
    return Promise.resolve()
    .then(() => expect(componentDidMountSpy).toHaveBeenCalledTimes(1))
  })

  test('Should unmount component', function () {
    const componentDidUnmountSpy = jest.fn()
    class Test extends Component {
      componentDidUnmount () {
        componentDidUnmountSpy()
      }
      render () {
        return 'Hello'
      }
    }
    const ui = NodeUi(['Test Unmount', Test.create()]).init()
    return Promise.resolve()
    .then(() => ui.remove())
    .then(() => expect(componentDidUnmountSpy).toHaveBeenCalledTimes(1))
  })

})
