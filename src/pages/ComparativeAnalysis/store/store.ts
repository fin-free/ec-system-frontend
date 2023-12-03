import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'table'
  public filters = {
    datetype: '0011',
    energyid: '0002',
    archivesId: '1',
    projectId: '1',
    yoyOrQoq: 'yoy',
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  }

  public electricityTableData?: TableData = undefined
}
