import dayjs from 'dayjs'
import { computed, makeAutoObservable } from 'mobx'

import { Item, StatisticsCard } from '../types'

export default class Store {
  constructor(projectId: string) {
    this.projectId = projectId
    makeAutoObservable(this, {
      filterAlarmData: computed
    })
  }

  public projectId: string
  public energyConsumptionPayload = {
    datetype: '0011',
    datatype: '0002',
    startTime: dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  public waterConsumptionPayload = {
    datetype: '0011',
    datatype: '0001',
    startTime: dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  public statisticsList: Array<StatisticsCard> = []
  public alarmData: Array<Item> = []
  public eventStatus: number = 0
  public energyConsumptionData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
    tooltipValue: string
  }[] = []
  public waterConsumptionData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
    tooltipValue: string
  }[] = []
  get filterAlarmData() {
    if (this.eventStatus < 0) {
      return this.alarmData
    }
    return this.alarmData.filter((data) => data.status === this.eventStatus)
  }
}
