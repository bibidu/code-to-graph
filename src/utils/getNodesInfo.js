/**
 * 获取identifier的原始指向节点
 */
exports.getSourcePath = (path) => {
  const { node, scope } = path
  path = scope.getBinding(node.name).path
  path.traverse({
    ReferencedIdentifier(node) {
      path = exports.getSourcePath(node)
    }
  })
  return path
}

/**
 * 获取函数调用类型的节点信息
 * @param: headNameNode: 根函数的节点
 * @param: fullName: 函数调用的全名(string)
 * 
 * @example:
 *  Node[utils.hello()] -> { headNameNode: Node[utils], fullName: 'utils.hello' }
 */
exports.getCallExpressionAboutFn = (path) => {
  let fullName = ''
  let callee = path.get('callee')
  while (callee.isMemberExpression()) {
    fullName =  callee.get('property') + (fullName ? `.${fullName}` : '')
    callee = callee.get('object')
  }
  fullName = callee.get('name').node + (fullName ? `.${fullName}` : '')

  return { headNameNode: callee, fullName }
}

/**
 * 获取节点的注释信息
 */
exports.getComments = (path) => {
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

  return { leading, trailing }
}

/**
 * 获取节点的位置信息
 */
exports.getLocation = (path) => {
  const loc = path.get('loc')

  if (!loc.node) return
  return {
    start: { line: loc.get('start.line').node, column: loc.get('start.column').node },
    end: { line: loc.get('end.line').node, column: loc.get('end.column').node },
  }
}
