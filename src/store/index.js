const map = {}
const nodeRange = {} // { range: id }

exports.add = (id, nodeInfo) => {
  // 节点已存在 忽略该次添加
  if (map[id] || exports.isNodeExist(nodeInfo)) return

  map[id] = nodeInfo
  saveNodeRange(id, nodeInfo)
}

exports.get = (id) => {
  return id ? map[id] : map
}

exports.update = (id, callback) => {
  if (!map[id]) throwMsg(`无法更新store, 不存在该id: \`${id}\``)

  map[id] = callback(map[id])
}


// ================= utils start =================
function throwMsg(msg) {
  throw Error(msg)
}
function getLineColumnId(loc) {
  const { start, end } = loc
  const id = `${start.line}:${start.column}-${end.line}:${end.column}`
  return id
}
function needDoAboutNodeRange(type) {
  if (type === 'FunctionDeclaration') {
    return true
  }
  return false
}
exports.isNodeExist = ({ type, loc }) => {
  if (needDoAboutNodeRange(type) && loc) {
    const id = getLineColumnId(loc)
    return nodeRange[id]
  }
  return false
}
function saveNodeRange(id, nodeInfo) {
  if (needDoAboutNodeRange(nodeInfo.type) && nodeInfo.loc) {
    const rangeId = getLineColumnId(nodeInfo.loc)
    nodeRange[rangeId] = id
  }
}
// ================= utils end =================
