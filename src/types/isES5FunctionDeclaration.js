/**
 * function a() {}
 */
exports.isES5FunctionDeclaration = (maybe) => {
  return maybe.isFunctionDeclaration()
}