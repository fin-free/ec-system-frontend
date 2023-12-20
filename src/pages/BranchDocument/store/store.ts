import { computed, makeAutoObservable } from 'mobx'
import { EnergyItem, NodeData } from '../types'
export default class Store {
  constructor() {
    makeAutoObservable(this, {
      filterEquipmentData: computed
    })
  }
  public selectedArchiveId = 0
  public selectedEquipmentId = ''
  public filter = {
    datatype: '0002'
  }
  public equipmentInput = ''
  public curArchivesItem: any
  public selectedNode: NodeData | undefined = undefined

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
