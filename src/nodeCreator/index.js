const {
  checkAttributesAndFilter
} = require('../utils')

exports.FunctionNode = (attrs = {}) => {
  const params = [
    'name', // 方法名
    'type', // 节点AST类型
    'comments', // 注释信息({ leading: [], trailing: [] })
    'loc', // 位置信息({ start: { line, column }, end: { line, column }})
    'async', // 是否是异步(boolean)
    'children', // 子节点id
  ]
  return checkAttributesAndFilter(attrs, params)
}

exports.CallFunctionNode = (attrs = {}) => {
  const params = [
    'name', // 调用的根函数名
    'fullName', // 调用函数全路径名
    'type', // 节点AST类型
    'parent', // 父节点id
  ]
  return checkAttributesAndFilter(attrs, params)
}

