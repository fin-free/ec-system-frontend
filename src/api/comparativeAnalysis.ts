import request from './request'

type TimeComparePayload = {
  datetype: string
  datatype: string
  archivesId?: string
  projectId: string
  yoyOrQoq: string
  startTime: string
  endTime: string
}

const getTimeCompareData = (data: TimeComparePayload) => request({ url: '/energy/timecompare', method: 'post', data })

const exportTimeCompareData = (data: TimeComparePayload) =>
  request({ url: '/energy/time-compare/export', method: 'post', data, responseType: 'arraybuffer' })

export { exportTimeCompareData, getTimeCompareData }
export type { TimeComparePayload }
