const {
  isArrowFunctionExpressionVar,
  isES5FunctionDeclaration,
} = require('../types')
const {
  getCallExpressionAboutFn, // 提取CallExpress的相关信息
  getLocation, // 提取节点位置信息
} = require('../utils')
const {
  isNodeExist,
} = require('../store')

const toTraverse = {
  FunctionDeclaration(path) {
    const type = path.type
    const loc = getLocation(path)
    if (isNodeExist({ type, loc })) return

    let name, async
    // 1. const a = () => {}
    if (isArrowFunctionExpressionVar(path)) {
      name = path.get('declarations.0.id.name').node
      async = path.get('declarations.0.init.async').node
    }

    // 2. function a() {}
    if (isES5FunctionDeclaration(path)) {
      name = path.get('id.name').node
      async = path.get('async').node
    }

    if (!name) return
    return {
      name,
      type,
      async,
      loc,
      children: [],
    }
  },

  CallExpression(path) {
    const { headNameNode, fullName } = getCallExpressionAboutFn(path)

    return {
      type: path.type,
      name: headNameNode.node.name,
      fullName,
    }
  }
}

// const lowerFirstCharPerKey = (obj) => Object.keys(toTraverse)
//   .map(key => key.charAt(0).toLowerCase() + key.slice(1))
// module.exports = lowerFirstCharPerKey(toTraverse)

module.exports = toTraverse