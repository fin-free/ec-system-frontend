import { makeAutoObservable } from 'mobx'

import { ActiveTab, ArchiveList, SelectOption, TreeNode } from '@/types'

export default class CommonStore {
  constructor() {
    makeAutoObservable(this)
  }

  public showLoading = false
  public activeTabs: ActiveTab[] = [
    { key: 'key-1', name: '统计看板' },
    { key: 'key-2', name: '电力数据查询' }
  ]

  public setShowLoading(val: boolean) {
    this.showLoading = val
  }

  public dateTypeOptions: Array<SelectOption> = []
  public energyTypeOptions: Array<SelectOption> = []
  public dataTypeOptions: Array<SelectOption> = []
  public alarmTypeOptions: Array<SelectOption> = []
  public functionTypeOptions: Array<SelectOption> = []
  public achieveList: Array<TreeNode> = []
  public buildingList: Array<TreeNode> = []
  public defaultExpandAchieveKeys: Array<string> = []
  public defaultSelectedAchieveKeys: Array<string> = []
  public defaultExpandBuildingKeys: Array<string> = []
  public defaultSelectedBuildingKeys: Array<string> = []
  public rawAchieveList: ArchiveList = []
}
