const Render = require('./Render')

describe('NodeUi Render', function () {

  test('Should be defined', function () {
    expect(Render).toBeDefined()
  })

  test('Should render string', function () {
    expect(Render('string')).toBe('\nstring')
  })

  test('Should render number', function () {
    expect(Render(1).includes('1')).toBeTruthy()
  })

  test('Should render boolean', function () {
    expect(Render(true).includes('true')).toBeTruthy()
    expect(Render(false).includes('false')).toBeTruthy()
  })

  test('Should render array', function () {
    expect(Render([1,2,3])).toBe('\n[1,2,3]')
  })

  test('Should render object', function () {
    expect(Render({a: 1, b: 2})).toBe('\n{"a":1,"b":2}')
  })

  test('Should render result of function', function () {
    expect(Render(function () {
      return 'Hello Function'
    })).toBe('\nHello Function')
  })
})
