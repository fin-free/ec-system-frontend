import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'table'
  public filters = {
    buildingId: '17',
    datatype: '0003',
    datetype: '0011',
    projectId: '1'
  }
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: (total: number) => `共 ${total} 条数据`
  }

  public environmentChartData: any = []
  public environmentTableData?: TableData = undefined
}
