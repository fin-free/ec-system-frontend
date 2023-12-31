import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public loading = false
  public mode = 'chart'
  public selectedArchiveId: string = ''
  public filters = {
    projectId: '1',
    datetype: '0011',
    datatype: '0002',
    yoyOrQoq: 'yoy',
    startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD 24:00:00')
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
  public energyComparativeChartYoyQoqData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
  }[] = []

  public energyComparativeTableData: any = undefined
}
