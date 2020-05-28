const {
  checkAttributesAndFilter
} = require('../utils')

exports.FunctionNode = (attrs = {}) => {
  const params = ['name', 'type', 'comments', 'children']
  return checkAttributesAndFilter(attrs, params)
}

exports.CallFunctionNode = (attrs = {}) => {
  const params = ['name', 'fullName', 'type', 'parent']
  return checkAttributesAndFilter(attrs, params)
}

