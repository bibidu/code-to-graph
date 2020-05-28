const jsx = require('@babel/plugin-syntax-jsx').default
const MyPlugin = require('./MyPlugin')

module.exports = function() {
  console.log('Plugin')
  return {
    plugins: [
      [jsx],
      MyPlugin()
    ],
  }
}