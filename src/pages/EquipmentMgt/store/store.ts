import { makeAutoObservable, observable } from 'mobx'
import { EquipmentItem } from '../typings'

export default class Store {
  public equipmentData: Array<EquipmentItem> = []
  public equipmentStatus = undefined
  constructor() {
    makeAutoObservable(this, {
      equipmentData: observable,
      equipmentStatus: observable,
    })
  }
}
