let id = 1
const idGenerator = () => id++

const getSourcePath = (path) => {
  const { node, scope } = path
  path = scope.getBinding(node.name).path
  path.traverse({
    ReferencedIdentifier(node) {
      path = getSourcePath(node)
    }
  })
  return path
}

const getCallExpressionAboutFn = (path) => {
  let fullName = ''
  let callee = path.get('callee')
  while (callee.isMemberExpression()) {
    fullName =  callee.get('property') + '.' + fullName
    callee = callee.get('object')
  }
  fullName = callee.get('name').node + '.' + fullName

  return { headNameNode: callee, fullName }
}

const getComments = (path) => {
  const leading = []
  const trailing = []
  if (path.get('leadingComments').length) {
    for (let comments of path.get('leadingComments')) {
      leading.push(comments.get('value').node)
    }
  }
  if (path.get('trailingComments').length) {
    for (let comments of path.get('trailingComments')) {
      trailing.push(comments.get('value').node)
    }
  }

  return [leading.join('\n'), trailing.join('\n')]
}

const checkAttributesAndFilter = (obj, requiredAttr) => {
  const newObj = {}
  for (let i = 0; i < requiredAttr.length; i++) {
    const key = requiredAttr[i]
    if (!key in obj) {
      const msg = `缺少${key}必须属性`
      throw msg
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

module.exports.idGenerator = idGenerator
module.exports.getSourcePath = getSourcePath
module.exports.getCallExpressionAboutFn = getCallExpressionAboutFn
module.exports.getComments = getComments

// 检查属性key是否存在
module.exports.checkAttributesAndFilter = checkAttributesAndFilter


