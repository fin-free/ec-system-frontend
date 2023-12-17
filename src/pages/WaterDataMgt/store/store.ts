import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public loading = false
  public mode = 'table'
  public selectedBuildingId: string = ''
  public filters = {
    datatype: '0001',
    datetype: '0011',
    projectId: '1'
  }
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 15,
    showTotal: (total: number) => `共 ${total} 条数据`
  }

  public waterTableData?: TableData = undefined
}
