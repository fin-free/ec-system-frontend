import { makeAutoObservable, observable } from 'mobx'
import { EquipmentItem } from '../typings'

export default class Store {
  public equipmentData: Array<EquipmentItem> = []
  public equipmentStatus = undefined
  public equipmentNum = undefined
  public projectId = undefined
  public pagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: (total: number) => `共 ${total} 条数据`
  }
  constructor() {
    makeAutoObservable(this)
  }

  changeEquipmentNum(num: any) {
    this.equipmentNum = num
  }

  changeEquipmentStatus(status: any) {
    this.equipmentStatus = status
  }
}
