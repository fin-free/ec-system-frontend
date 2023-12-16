import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'
import { ChartData } from '../types'
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
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    archivesIds: [] as string[]
  }

  public lineComparisonDataChartData: ChartData[] = [] as any
}
