export interface ILoginParams {
  userName: string
  password: string
}

export type UserInfo = {
  userName?: string
}

export type ActiveTab = {
  key?: string
  name: string
}

export type SelectOption = {
  key: string
  label: string
  value: string
}

export type DictItem = {
  dictLabel: string
  dictValue: string
}

export type TreeNode = {
  key: number
  title: string
  children?: Array<TreeNode>
}

export type BuildList = {
  buildingId: number
  buildingName: string
  parentId: number
  childrenList: BuildList
}[]

export type ArchiveList = {
  archivesId: number
  archivesName: string
  parentId: number
  matchingStatus: number
  childrenList: ArchiveList
}[]
