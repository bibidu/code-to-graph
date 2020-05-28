// const gen = require('@babel/generator').default
// const ast2code = ast => gen(ast, {}).code
const codeana = require('../src/index')

module.exports = function() {
  return codeana()
}