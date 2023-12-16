import { computed, makeAutoObservable } from 'mobx'

import { StatisticsCard } from '../types'
import dayjs from 'dayjs'
import { Item } from '../types'
export default class Store {
  constructor() {
    makeAutoObservable(this, {
      filterAlarmData: computed
    })
  }

  public energyConsumptionPayload = {
    datetype: '0011',
    datatype: '0002',
    projectId: '1',
    startTime: dayjs().startOf('day').format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().endOf('day').format('YYYY-MM-DD 24:00:00')
  }
  public statisticsList: Array<StatisticsCard> = []
  public alarmData: Array<Item> = []
  public eventStatus: number = 0
  public energyConsumptionData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
  }[] = []
  get filterAlarmData() {
    if (this.eventStatus < 0) {
      return this.alarmData
    }
    return this.alarmData.filter((data) => data.status === this.eventStatus)
  }
}
