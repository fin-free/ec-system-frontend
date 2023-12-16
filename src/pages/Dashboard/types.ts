export type StatisticsCard = {
  key: string
  title: string
  value: string | number
}

export interface Item {
  type: number
  equipmentNum: string
  gatewayNum: string
  alarmDetail: string
  status: number
  startTime: string
  operations: string
  alarmId: number
  key?: number
}
