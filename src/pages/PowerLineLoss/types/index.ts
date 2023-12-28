export interface LossCompareItem {
  archivesId: number //档案id
  subEnergyValue: number //子级能耗值
  loseRateValue: number //线损比例值
  loseValue: number //线损值
  parentId: number //父id
  archivesName: string //档案名称
  childrenList: LossCompareItem[]
}
