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

export function serviceDetail(id) {
  return request({
    url: '/service/service_detail',
    method: 'get',
    params: { id: id }
  })
}

export function serviceAddHTTP(data) {
  return request({
    url: '/service/service_add_http',
    method: 'post',
    data
  })
}

export function serviceUpdateHTTP(data) {
  return request({
    url: '/service/service_update_http',
    method: 'put',
    data
  })
}

export function serviceAddTCP(data) {
  return request({
    url: '/service/service_add_tcp',
    method: 'post',
    data
  })
}

export function serviceUpdateTCP(data) {
  return request({
    url: '/service/service_update_tcp',
    method: 'put',
    data
  })
}

export function serviceAddGRPC(data) {
  return request({
    url: '/service/service_add_grpc',
    method: 'post',
    data
  })
}

export function serviceUpdateGRPC(data) {
  return request({
    url: '/service/service_update_grpc',
    method: 'put',
    data
  })
}

export function serviceStat(id) {
  return request({
    url: '/service/service_stat',
    method: 'get',
    params: { id: id }
  })
}