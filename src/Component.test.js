const Component = require('./Component')

describe('NodeUi Component', function () {

  test('Should be defined', function () {
    expect(Component).toBeDefined()
  })

  test('Should be able to create a Component', function () {
    const cmp = Component.create()()
    expect(cmp).toBeInstanceOf(Component)
  })

  test('Should be able to extend a Component', function () {
    class Test extends Component {}
    const cmp = Test.create()()
    expect(cmp).toBeInstanceOf(Component)
  })

  test('Should throw error if no render supplied', function () {
    class Test extends Component {}
    const cmp = Test.create()()
    expect(cmp.render.bind(cmp)).toThrowError('"Test" did not implement render function')
  })

  test('Should throw error if no render supplied', function () {
    class Test extends Component {
      render () {
        return 'Hello'
      }
    }
    const cmp = Test.create()()
    expect(cmp.render()).toBe('Hello')
  })

})
