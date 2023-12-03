import request from './request'

type EnergyConsumptionPayload = {
  datetype: string
  energyid: string
  archivesId: string
  projectId: string
  startTime: string
  endTime: string
}

const getEnergyConsumptionData = (data: EnergyConsumptionPayload) =>
  request({ url: '/energy/get/energyvalue', method: 'post', data })

export { getEnergyConsumptionData }
