const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
// const code = fs.readFileSync('/Users/mr.du/Desktop/bibidu/react-to-react-native/packages/core/app.js', 'utf8')
const code = fs.readFileSync('./test/index.js', 'utf8')
// const code = `
// import a from 'a'
// import * as b from 'b'
// import { default as c } from 'c'
// require('egm')
// @log
// class T{
//   render() {
//     a?.b.c()
//   }
// }`

function start() {
  const ast = parser.parse(code, {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    allowReturnOutsideFunction: false,
    createParenthesizedExpressions: false,
    ranges: false,
    tokens: false,
    plugins: [
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods', 
      ['decorators', { decoratorsBeforeExport: true }],
      'doExpressions',
      'exportDefaultFrom',
      'flow',
      'functionSent',
      'functionBind',
      'jsx',
      'logicalAssignment',
      'numericSeparator',
    ]
  })
  traverse(ast, {
    ClassProperty(path) {
      const hasLeadingComment = path.get('leadingComments')
      if (hasLeadingComment.length) {
        const fn = path.get('key.name').node
        const comment = path.get('leadingComments.0.value').node
        console.log(fn, comment)
      }
    },
  })
}

start()
