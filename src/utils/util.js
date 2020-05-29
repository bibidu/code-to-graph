/**
 * 检查属性key是否存在并过滤无效属性
 */
exports.checkAttributesAndFilter = (obj, requiredAttr) => {
  const newObj = {}
  for (let i = 0; i < requiredAttr.length; i++) {
    const key = requiredAttr[i]
    if (!(key in obj)) {
      const msg = `缺少 \`${key}\` required属性`
      throw Error(msg)
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}


/**
 * 生成唯一id
 */
let id = 1
exports.idGenerator = () => id++
