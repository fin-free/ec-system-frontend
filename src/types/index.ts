import { ReactNode } from 'react'

export interface ILoginParams {
  userName: string
  password: string
}

export type UserInfo = {
  id?: number
  username?: string
  realName?: string
  gender?: number
  email?: string
  mobile?: string
  status?: number
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
  key: string
  title: string | ReactNode
  children?: Array<TreeNode>
  selectable?: boolean
} & Partial<RawTreeNode>

export type RawTreeNode = {
  archivesId: number
  archivesLevel: number
  archivesName: string
  childrenList: RawTreeNode[]
  matchingStatus: number
  parentId: number
  parentName: string
}

export type BuildList = {
  buildingId: number
  buildingName: string
  parentId: number
  childrenList: BuildList
}[]

export type ArchiveList = RawTreeNode[]
