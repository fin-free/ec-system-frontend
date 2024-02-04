import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

type ChartData = {
  archivesId: number
  archivesName: string
  list: {
    clearingPeriod: string
    energyValue: number | string
  }[]
}[]

export default class Store {
  constructor(projectId: string) {
    this.projectId = projectId
    makeAutoObservable(this)
  }

  public projectId: string
  public loading = false
  public mode = 'chart'
  public selectedArchiveIds: number[] = []
  public filters = {
    datetype: '0011',
    datatype: '0002',
    startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD 24:00:00'),
    archivesIds: [] as number[]
  }

  public lineComparisonChartData: ChartData = []
}
