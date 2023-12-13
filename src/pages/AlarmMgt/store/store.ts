import { makeAutoObservable, observable } from 'mobx'
import { Item } from '../typings'
import type { Dayjs } from 'dayjs'

type RangeValue = [Dayjs | null, Dayjs | null] | null

export default class Store {
  public alarmType = undefined
  public eventStatus = undefined
  public timeRange: RangeValue = null
  public alarmData: Array<Item> = []
  constructor() {
    makeAutoObservable(this, {
      alarmData: observable,
      alarmType: observable,
      eventStatus: observable,
      timeRange: observable
    })
  }

  changeAlarmType(type: any) {
    this.alarmType = type;
  }

  changeEventStatus(type: any) {
    this.eventStatus = type;
  }

  changeTimeRange(timeRange: any) {
    this.timeRange = timeRange;
  }
}
