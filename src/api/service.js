import request from '@/utils/request'

export function serviceList(serviceQuery) {
  return request({
    url: '/service/service_list',
    method: 'get',
    params: serviceQuery
  })
}

export function serviceDelete(id) {
  return request({
    url: '/service/service_delete',
    method: 'delete',
    params: { id: id }
  })
}