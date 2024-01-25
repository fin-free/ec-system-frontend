import request from './request'

type EnergyConsumptionPayload = {
  datetype: string
  datatype: string
  projectId: string
  startTime: string
  endTime: string
}

const getEnergyConsumptionData = (data: EnergyConsumptionPayload) =>
  request({ url: '/energy/get/energyvalue', method: 'post', data })

const exportEnergyConsumptionData = (data: EnergyConsumptionPayload) =>
  request({ url: '/iot/energy/energy-value/export', method: 'post', data, responseType: 'arraybuffer' })

export { exportEnergyConsumptionData, getEnergyConsumptionData }
