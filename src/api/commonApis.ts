import request from './request'

const getDictList = (params: { dictType: string }) => request({ url: '/sys/dict/list', method: 'get', params })

const getAchieveList = (params: { projectId: number }) =>
  request({ url: '/energy/archives/tree', method: 'get', params })

const getBuildingList = (params: { projectId: number }) =>
  request({ url: '/sys/buildinginfo/tree', method: 'get', params })

export default { getDictList, getAchieveList, getBuildingList }
