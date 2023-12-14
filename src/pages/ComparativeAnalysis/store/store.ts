import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'chart'
  public selectedArchiveId: string = ''
  public filters = {
    projectId: '1',
    datetype: '0011',
    datatype: '0002',
    yoyOrQoq: 'yoy',
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  }

  public energyComparativeChartData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
  }[] = []
  public energyComparativeChartNowData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
  }[] = []
  public energyComparativeCharYoyQoqData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
  }[] = []

  public energyComparativeTableData?: TableData = undefined
}
