import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public mode = 'table'
  public filters = {
    projectId: '1',
    datetype: '0011',
    energyid: '0002',
    archivesId: '1',
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
  }
  public energyConsumptionData = []

  public electricityTableData?: TableData = undefined
}
