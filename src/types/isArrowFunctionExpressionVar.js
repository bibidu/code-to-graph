/**
 * const a = () => {}
 */
exports.isArrowFunctionExpressionVar = (maybe) => {
  if (
    maybe.isVariableDeclaration()
    && maybe.get('declarations').node
    && maybe.get('declarations').length
  ) {
    const decls = Array.from(maybe.get('declarations'))

    return decls.some(decl => decl.get('init').isArrowFunctionExpression())
  }
}