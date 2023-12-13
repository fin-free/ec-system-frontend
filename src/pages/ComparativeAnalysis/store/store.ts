import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'chart'
  public filters = {
    datetype: '0011',
    datatype: '0002',
    archivesId: '1',
    projectId: '1',
    yoyOrQoq: 'yoy',
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  }

  public energyComparativeChartData: { clearingPeriod: string; energyValue: number; proportion: number }[] = []

  public energyComparativeTableData?: TableData = undefined
}
