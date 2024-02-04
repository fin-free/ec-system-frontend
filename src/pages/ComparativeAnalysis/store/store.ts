import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

export default class Store {
  constructor(projectId: string) {
    this.projectId = projectId
    makeAutoObservable(this)
  }

  public projectId: string
  public loading = false
  public mode = 'chart'
  public selectedArchiveId: string = ''
  public filters = {
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
    tooltipValue: string
  }[] = []
  public energyComparativeChartNowData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
    tooltipValue: string
  }[] = []
  public energyComparativeChartYoyQoqData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
    tooltipValue: string
  }[] = []

  public energyComparativeTableData: any = undefined
}
