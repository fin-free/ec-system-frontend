export type EquipmentList = {
  name: string
  children?: Array<EquipmentList>
}

export type TreeNode = {
  key: string
  title: string
  children?: Array<TreeNode>
}

export type TableData = Array<{
  orderNum: number
  name: string
  date: string
  voltage: number
}>
