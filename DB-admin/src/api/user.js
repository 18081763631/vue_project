import request from '@/utils/request'


/* 删用户 */
export function deleteUser(data) {
  return request({
    url: '/admin/user/deleteByOpenid',
    method: 'post',
	data
  })
}
/* 获取用户信息 */
export function getlist(id) {
  return request({
    url: '/admin/user/getAll',
    method: 'get',
    params: { id }
  })
}
/* 拉黑用户 */
export function ban(data) {
  return request({
    url: '/admin/user/ban',
    method: 'post',
    data
  })
}
/* 删帖子 */
export function banhuati(data) {
  return request({
    url: '/admin/topics/deleteById',
    method: 'post',
   data
  })
}
/* 获取话题列表 */
export function gethuati(id) {
  return request({
    url: '/admin/topic/getAll',
    method: 'get',
    params: { id }
  })
}
/* 获取第一页动态 */
export function getdata(id) {
  return request({
    url: '/admin/topics/getAll',
    method: 'get',
    params: { id }
  })
}
/* 获取第一页动态 */
export function gettopics(id) {
	var data = {page:id}
  return request({
    url: '/admin/topics/getAllMore',
    method: 'post',
    params: { data }
  })
}
/* 删话题 */
export function banTopic(data) {
  return request({
    url: '/admin/topic/deleteById',
    method: 'post',
    data
  })
}
