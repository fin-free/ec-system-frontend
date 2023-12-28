import type { Dayjs } from 'dayjs'
import { makeAutoObservable } from 'mobx'

import { Item } from '../typings'

type RangeValue = [Dayjs | null, Dayjs | null] | null

export default class Store {
  public alarmType = 0
  public eventStatus = 0
  public timeRange: RangeValue = null
  public alarmData: Array<Item> = []
  constructor() {
    makeAutoObservable(this)
  }
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 15,
    showTotal: (total: number) => `共 ${total} 条数据`
  }
}
