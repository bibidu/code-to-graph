import { http } from '@util/axios'
import { feedStructPolyfill } from '@util/util'

// 判断用户是否有主页
export function judgeHaveMainPage (data) {
  return http.serilizeGet('/user/profile/judge', data)
}
// 获取header中的地理位置信息
export function getLocationInfo ({ vlat, vlon }) {
  return http.absoluteGet(`https://tzcapp.58.com/position/nearest/areas?mlat=${vlat}&mlon=${vlon}`)
}

// 首页数据上报，已废弃
// export function reportWhenInMain (data) {
//   return http.serilizeGet('/user/profile/visit', data)
// }

// 访客数据上报
export function reportVisit (data) {
  return http.serilizeGet('/user/visit/record', data, 'tzuvvisit')
}

// 获取个人主页feed列表
export async function getMainList (data) {
  let res = await http.serilizeGet('/profile/feed/list', data)
  const polyfill = feedStructPolyfill(res)
  return res
}

// 查询feed详情
export async function getFeedDetail (data) {
  let res = await http.serilizeGet('/profile/feed/detail', data)
  const polyfill = feedStructPolyfill(res)
  return polyfill
}

// 查询评论列表
export function getCommentList (data) {
  return http.serilizeGet('/comment/list', data)
}

// 查询动态的评论列表
export function getActiveCommentList (data) {
  return http.serilizeGet('/comment/feed/list', data)
}

// 查询回复列表
export function getReplyList (data) {
  return http.serilizeGet('comment/reply/listByFeedId', data)
}

// 点赞、取消点赞帖子
export function likeAny (data) {
  return http.serilizePost('/comment/like/feed', data)
}

// 【动态】点赞、取消点赞帖子
export function likeActiveFeed (data) {
  return http.serilizePost('/comment/like/comment', data)
}
// 关注、取关
export function focusAny (data) {
  return http.serilizePost('/relation/focus', {resultFocusStatus: 1, ...data})
}

// 获取个人主页顶部信息
export function getUserTopInfo (data) {
  return http.serilizeGet('/user/profile', data)
}

// 查询粉丝列表
export function getFansList (data) {
  return http.serilizeGet('/relation/fansList', data)
}

// 查询我的关注
export function getFocusList (data) {
  return http.serilizeGet('/relation/focusList', data)
}

// 查询最近访客
export function getVisitList (data) {
  return http.serilizeGet('/relation/visitList', data)
}

// 查询收到的赞
export function getFavList (data) {
  return http.serilizeGet('/relation/likeMeList', data)
}

// 对帖子评论
export function commentAnyFeed (data) {
  return http.serilizePost('/comment/save', data)
}
// 对评论进行回复
export function replyAnyComment (data) {
  return http.serilizePost('/comment/reply', data)
}
// 查询对方是否关注我
export function isFocusMe (data) {
  return http.serilizePost('/user/focusme', data)
}
// 查询互动消息列表
export function getInteractList (data) {
  return http.serilizeGet('/interact/list', data)
}
// 获取本地人列表
export function getLocalList (data) {
  return http.serilizeGet('/localuser/list', data)
}
// 查询动态点赞列表
export function getActiveFeedLikeList (data) {
  return http.serilizeGet('/comment/like/list', data)
}
// // 查询动态详情的评论
// export function getActiveComments (data) {
//   return http.serilizeGet('/comment/active/list', data)
// }
// 删除动态feed
export function delActiveFeed (data) {
  return http.serilizePost('/profile/feed/del', data)
}
// 删除动态feed的评论
export function delActiveFeedComment (data) {
  return http.serilizePost('/comment/delete', data)
}
// 查询话题聚合页列表
export function getTopicList (data) {
  return http.serilizeGet('/topic/feed/list', data)
}
// 根据话题id查询话题内容
export function getTopicById (data) {
  return http.serilizeGet('/topic/feed/title', data)
}
// 查询所有身份标签
export function getUserIdentityTagList (data) {
  return http.serilizeGet('/user/identityTags', data)
}
// 根据feedId查询个人主页feed
export function getMainPageFeedInfo (data) {
  return http.serilizeGet('/profile/feed/item', data)
}

// ====================== 本地内容官 userpublish ======================
const localSerilizeConfig = {
  msg: 'msg',
  code: 'statusCode',
  data: 'result',
}
// const testObj = { userId: '47325277713684' }

// 首次进入 内容官活动页 请求数据
export function getLocalContentActivityAllData(data) {
  return http.getWithDomain('/local/postactivity', {
    ...data,
  }, 'tzpost', localSerilizeConfig)
}
// 查询 我的发帖（当前：内容官活动页）
export function getLocalContentActivityMyPosts(data) {
  return http.getWithDomain('/local/post/my', {
    ...data,
    pageType: 'activity',
  }, 'tzpost', localSerilizeConfig)
}
// 查询 人气文章
export function getLocalContentActivityHotList(data) {
  return http.getWithDomain('/local/postactivity/more', {
    ...data,
  }, 'tzpost', localSerilizeConfig)
}
// 首次进入 本地内容管理页 请求数据
export function getLocalContentManageAllData(data) {
  return http.getWithDomain('/local/post', {
    ...data,
  }, 'tzpost', localSerilizeConfig)
}
// 查询 我的发帖（当前：内容管理页）
export function getLocalContentManageMyPosts(data) {
  return http.getWithDomain('/local/post/my', {
    ...data,
    pageType: 'manage',
  }, 'tzpost', localSerilizeConfig)
}
// 删除帖子
export function deletePost(data) {
  return http.postWithDomain('/local/post/delarticle', data, 'tzpost', localSerilizeConfig)
}
// ====================== 本地内容官 userpublish ======================
