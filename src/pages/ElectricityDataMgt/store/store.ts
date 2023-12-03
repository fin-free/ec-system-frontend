import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'table'
  public filters = {
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    buildingId: '17',
    energytype: '0002',
    datetype: '0011',
    functiontype: '0021',
    projectId: '1'
  }
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: (total: number) => `共 ${total} 条数据`
  }

  public electricityTableData?: TableData = undefined
}
