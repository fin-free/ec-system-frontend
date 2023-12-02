import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData } from '@/types/ElectricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public filterDate = dayjs()
  public filterDataType: string = '0011'

  public electricityTableData?: TableData = undefined
}
