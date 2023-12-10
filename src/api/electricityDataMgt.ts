import request from './request'

// 设备列表
const getEquipmentList = (params: { projectId: number }) =>
  request({ url: '/sys/buildinginfo/tree', method: 'get', params })

type ElectricityDataPayload = {
  startTime?: string
  endTime?: string
  buildingId: string
  datatype: string
  datetype: string
  functiontype: string
  projectId: string
  pageNum: string
  pageSize: string
}

// 电力数据详情
const getElectricityDataByType = (data: ElectricityDataPayload) =>
  request({ url: '/eceraw/datalist', method: 'post', data })

export { getElectricityDataByType, getEquipmentList }
export type { ElectricityDataPayload }
