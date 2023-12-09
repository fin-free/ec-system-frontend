import { makeAutoObservable } from 'mobx'

import { StatisticsCard } from '../types'
import dayjs from 'dayjs'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public energyConsumptionPayload = {
    datetype: '0011',
    energyid: '0002',
    projectId: '1',
    startTime: dayjs().startOf('day').format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().endOf('day').format('YYYY-MM-DD 24:00:00')
  }
  public statisticsList: Array<StatisticsCard> = []
  public energyConsumptionData: { clearingPeriod: string; energyValue: number; proportion: number }[] = []
}
