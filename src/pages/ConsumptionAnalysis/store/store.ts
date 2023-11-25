import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { TableData, TreeNode } from '@/types/electricityDataMgt'

export default class Store {
  constructor() {
    makeAutoObservable(this)
  }

  public filterDate = dayjs()
  public filterDataType: string = 'voltage'

  public equipmentList?: Array<TreeNode> = undefined
  public electricityTableData?: TableData = undefined
}
