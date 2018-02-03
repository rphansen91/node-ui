const fs = require('fs')
const title = fs.readFileSync(__dirname+ '/Title.txt', 'utf8')
module.exports = function () {
  return title
}
