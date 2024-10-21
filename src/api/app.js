import request from '@/utils/request'

export function appList(appQuery) {
  return request({
    url: '/app/app_list',
    method: 'get',
    params: appQuery
  })
}

export function appDelete(id) {
  return request({
    url: '/app/app_delete',
    method: 'delete',
    params: { id: id }
  })
}

export function appDetail(id) {
  return request({
    url: '/app/app_detail',
    method: 'get',
    params: { id: id }
  })
}

export function appAdd(data) {
  return request({
    url: '/app/app_add',
    method: 'post',
    data
  })
}

export function appUpdate(data) {
  return request({
    url: '/app/app_update',
    method: 'put',
    data
  })
}

export function appStat(id) {
  return request({
    url: '/app/app_stat',
    method: 'get',
    params: { id: id }
  })
}