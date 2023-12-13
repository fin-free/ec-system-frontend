import { makeAutoObservable, observable } from 'mobx'
import { EquipmentItem } from '../typings'

export default class Store {
  public equipmentData: Array<EquipmentItem> = []
  public equipmentStatus = undefined
  public equipmentNum = undefined
  public projectId = undefined
  constructor() {
    makeAutoObservable(this, {
      equipmentData: observable,
      equipmentStatus: observable,
      equipmentNum: observable,
      projectId: observable
    })
  }

  changeEquipmentNum(num: any) {
    this.equipmentNum = num
  }

  changeEquipmentStatus(status: any) {
    this.equipmentStatus = status
  }
}
