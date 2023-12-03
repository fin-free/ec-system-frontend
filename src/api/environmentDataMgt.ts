import request from './request'

type EnvironmentDataPayload = {
  startTime: string
  endTime: string
  buildingId: string
  energytype: string
  datetype: string
  functiontype?: string
  projectId: string
  pageNum: string
  pageSize: string
}

// 环境数据详情
const getEnvironmentDataByType = (data: EnvironmentDataPayload) =>
  request({ url: '/eceraw/datalist', method: 'post', data })

export { getEnvironmentDataByType }
export type { EnvironmentDataPayload }
