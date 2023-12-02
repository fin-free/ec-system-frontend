import request from './request'

type BuildComparePayload = {
  datetype: string
  energyid: string
  archivesId: string
  projectId: string
  startTime: string
  endTime: string
  archivesIds: Array<number>
}

const getBuildCompareData = (data: BuildComparePayload) =>
  request({ url: '/energy/buildcompare', method: 'post', data })

type TimeComparePayload = {
  datetype: string
  energyid: string
  archivesId: string
  projectId: string
  yoyOrQoq: string
  startTime: string
  endTime: string
}
const getTimeCompareData = (data: TimeComparePayload) => request({ url: '/energy/timecompare', method: 'post', data })

type EnergyComparePayload = {
  datetype: string
  energyid: string
  archivesId: string
  projectId: string
  startTime: string
  endTime: string
}

const getEnergyCompareData = (data: EnergyComparePayload) =>
  request({ url: '/energy/get/energyvalue', method: 'post', data })

export { getBuildCompareData, getTimeCompareData, getEnergyCompareData }
export type { BuildComparePayload, TimeComparePayload, EnergyComparePayload }
