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
    startTime: dayjs().add(-2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    archivesIds: [] as string[]
  }

  public lineComparisonChartData: { clearingPeriod: string; energyValue: number; proportion: number }[] = []

  public lineComparisonTableData: any = undefined
}
