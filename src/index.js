const {
  idGenerator, // 唯一id生成
  getComments, // 获取节点的注释信息
} = require('./utils')
const {
  FunctionNode,
  CallFunctionNode,
} = require('./nodeCreator')
const ast2json = require('./ast2json')
const store = require('./store')

module.exports = function start() {
  return {
    visitor: {
      // ExportNamedDeclaration(path) {
      //   if (path.get('declaration').node) {
      //     const needJudgePath = path.get('declaration')

      //     const nodes = ast2json.FunctionDeclaration(needJudgePath)
      //     if (nodes) {
      //       const id = idGenerator()
      //       store.add(id, FunctionNode({
      //         ...nodes,
      //         comments: getComments(path),
      //       }))
      //     }
      //   }
      // },

      FunctionDeclaration(path) {
        let id = null
        const nodes = ast2json.FunctionDeclaration(path)
        if (nodes) {
          store.add((id = idGenerator()), FunctionNode({
            ...nodes,
            comments: getComments(path),
          }))
        }
        
        if (!id) return path.skip()
        path.traverse({
          CallExpression(_path) {
            const nodes = ast2json.CallExpression(_path)
            const childId = idGenerator()
            store.add(childId, CallFunctionNode({
              ...nodes,
              parent: id,
            }))

            store.update(id, (state) => ({
              ...state,
              children: [...state.children, childId]
            }))
          }
        })
      },

      Program: {
        exit() {
          console.log('exit')
          const result = store.get()
          require('fs').writeFileSync('./graph.json', JSON.stringify(result, null, 2), 'utf8')
        }
      }
    }
  }
}
