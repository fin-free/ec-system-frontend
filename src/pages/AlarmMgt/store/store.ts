import { makeAutoObservable, observable } from 'mobx'
import { Item } from '../typings'

export default class Store {
  public alarmType = undefined
  public eventStatus = undefined
  public alarmData: Array<Item> = []
  constructor() {
    makeAutoObservable(this, {
      alarmData: observable,
      alarmType: observable,
      eventStatus: observable,
    })
  }

  changeAlarmType(type: any) {
    this.alarmType = type;
  }

  changeEventStatus(type: any) {
    this.eventStatus = type;
  }
}
