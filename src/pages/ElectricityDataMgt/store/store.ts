import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public filters = {
    startTime: '2023-11-20 00:00:00',
    endTime: '2023-11-25 00:00:00',
    buildingId: '17',
    energytype: '0002',
    datetype: '0011',
    functiontype: '0001',
    projectId: '1',
    pageNum: '1',
    pageSize: '20'
  }
  public filterDate = dayjs()
  public filterDataType: string = '0011'

  public electricityTableData?: TableData = undefined
}
