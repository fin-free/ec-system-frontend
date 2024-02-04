import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

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
    startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD 24:00:00')
  }

  public energyConsumptionChartData: {
    clearingPeriod: string
    energyValue: number
    proportion: number
    tooltipValue: string
  }[] = []

  public energyConsumptionTableData?: TableData = undefined
}
