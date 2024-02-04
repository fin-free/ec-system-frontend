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
  public mode = 'table'
  public selectedBuildingId: string = ''
  public filters = {
    startTime: dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    datatype: '0001',
    datetype: '0011',
    equipmentNum: ''
  }
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 15,
    showTotal: (total: number) => `共 ${total} 条数据`
  }

  public waterTableData?: TableData = undefined
}
