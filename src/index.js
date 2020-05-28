const {
  idGenerator, // 唯一id生成
  getCallExpressionAboutFn, // 提取CallExpress的相关信息
  getComments, // 获取节点的注释信息
} = require('./utils')
const {
  FunctionNode,
  CallFunctionNode,
} = require('./Node')

const map = {}

module.exports = function start() {
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        if (path.get('declaration').node && path.get('declaration.declarations').node) {
          const id = idGenerator()
          const maybeArrowVar = path.get('declaration.declarations.0')
          if (maybeArrowVar.get('init') && maybeArrowVar.get('init').isArrowFunctionExpression()) {
            const name = maybeArrowVar.get('id.name').node
  
            map[id] = FunctionNode({
              name,
              type: path.type,
              comments: getComments(path),
              children: []
            })
          }
        }
      },

      FunctionDeclaration(path) {
        const id = idGenerator()
        const name = path.get('id').get('name').node

        // 保存当前函数节点信息
        map[id] = FunctionNode({
          name,
          type: path.type,
          comments: getComments(path),
          children: []
        })

        path.traverse({
          CallExpression(_path) {
            const _id = idGenerator()
            const { headNameNode, fullName } = getCallExpressionAboutFn(_path)
  
            // 保存当前函数节点信息
            map[_id] = CallFunctionNode({
              name: headNameNode.node.name,
              fullName,
              type: _path.type,
              comments: '',
              parent: id
            })
            map[id].children.push(_id)
          }
        })
      },

      Program: {
        exit() {
          console.log('exit')
          console.log(map)
        }
      }
    }
  }
}
