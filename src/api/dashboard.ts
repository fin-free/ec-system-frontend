import request from './request'

// 统计数据
const getStatisticSummary = (params: { projectId: number }) =>
  request({ url: '/energy/home', method: 'get', params })

export { getStatisticSummary }
