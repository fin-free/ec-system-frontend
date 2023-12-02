import request from './request'

// 统计数据
const getStatisticSummary = (params: { projectId: number }) => request({ url: '/energy/home', method: 'get', params })

const getAlarmList = (params: { projectId: number; status: number; pageSize: number; endTime?: string }) =>
  request({ url: '/alarm/list', method: 'get', params })

export { getStatisticSummary, getAlarmList }
