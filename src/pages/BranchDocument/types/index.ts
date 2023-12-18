export type EnergyItem = {
  equipmentId: number
  equipmentName: string
  equipmentNum: string
  productModel: string
  energyType: string
  enabledStatus: number //0的话多选框需要禁用 1的话多选框启用
  bindStatus: number //0的未多选框不需要打勾 1的话多选框需要打勾
}

export type NodeData = {
  archivesId: number
  archivesLevel: number
  archivesName: string
  children: NodeData[]
  key: string
  matchingStatus: number
  parentId: number
  parentName: string
}
