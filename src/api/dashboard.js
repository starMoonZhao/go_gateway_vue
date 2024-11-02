import request from '@/utils/request'

export function panelGroupData() {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get'
  })
}

export function flowStat() {
  return request({
    url: '/dashboard/flow_stat',
    method: 'get'
  })
}

export function serviceStat() {
  return request({
    url: '/dashboard/service_stat',
    method: 'get'
  })
}