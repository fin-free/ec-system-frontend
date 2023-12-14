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

export { getTimeCompareData }
export type { TimeComparePayload }
