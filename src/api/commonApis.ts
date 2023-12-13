import request from './request'

const getDictList = (params: { dictType: string }) => request({ url: '/sys/dict/list', method: 'get', params })

const getAchieveList = (params: { projectId: string }) =>
  request({ url: '/energy/archives/tree', method: 'get', params })

const getBuildingList = (params: { projectId: string }) =>
  request({ url: '/sys/buildinginfo/tree', method: 'get', params })

export default { getDictList, getAchieveList, getBuildingList }
