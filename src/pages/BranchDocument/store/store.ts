import { computed, makeAutoObservable } from 'mobx'
import { EnergyItem } from '../types'
export default class Store {
  constructor() {
    makeAutoObservable(this, {
      filterEquipmentData: computed
    })
  }
  public selectedArchiveId = ''
  public selectedEquipmentId = ''
  public filter = {
    energyType: '0001'
  }
  public equipmentInput = ''
  public curArchivesItem: any

  public archiveTreeData = []
  public energyEquipmentData: Array<EnergyItem> = []
  public treeMode = ''

  get filterEquipmentData() {
    return this.energyEquipmentData.filter(
      (data) =>
        data.equipmentName.includes(this.equipmentInput) ||
        data.equipmentNum.includes(this.equipmentInput)
    )
  }
}
