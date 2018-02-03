const Logger = require('./Logger')

describe('NodeUi Logger', function () {

  test('Should be defined', function () {
    expect(Logger).toBeDefined()
  })

  test('Should be able to log', function () {
    expect(typeof Logger.log).toBe('function')
    expect(Logger.log('log')).not.toBeDefined()
    expect(Logger.log(1)).not.toBeDefined()
  })

  test('Should be able to log warning', function () {
    expect(typeof Logger.warning).toBe('function')
    expect(Logger.warning('warn')).not.toBeDefined()
  })

  test('Should be able to log error', function () {
    expect(typeof Logger.error).toBe('function')
    expect(Logger.error('err')).not.toBeDefined()
    expect(Logger.error({message: 'err'})).not.toBeDefined()
    expect(Logger.error({message: 'err', stack: 'stack'})).not.toBeDefined()
  })

})
