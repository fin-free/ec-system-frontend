import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

type ChartData = {
  archivesId: number
  archivesName: string
  list: {
    clearingPeriod: string
    energyValue: number
  }[]
}[]

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
    startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD 24:00:00'),
    archivesIds: [] as number[]
  }

  public lineComparisonChartData: ChartData = []

  public lineComparisonTableData: any = undefined
}
