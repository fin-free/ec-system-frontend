import { get } from 'lodash'
import { runInAction } from 'mobx'

import * as API from '@/api/ElectricityDataMgt'
import { EquipmentList, TreeNode } from '@/types/electricityDataMgt'

import Store from './store'

export default class Actions {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  async getElectricityTableData() {
    await API.getElectricityDataByType().then((res) => {
      if (res) {
        runInAction(() => {
          this._store.electricityTableData = get(res, 'data', []).map((d, index) => {
            const rowData = { ...d, orderNum: index + 1 }
            return rowData
          })
        })
      }
    })
  }

  async getEquipmentListData() {
    await API.getEquipmentList().then((res) => {
      if (res) {
        runInAction(() => {
          const treeData: Array<TreeNode> = []
          this.buildTreeData(get(res, 'data', []), '0', treeData)
          this._store.equipmentList = treeData
        })
      }
    })
  }

  buildTreeData(data: Array<EquipmentList>, level: string = '0', treeData: Array<TreeNode>) {
    data.forEach((d, index) => {
      const { name, children } = d
      const node: TreeNode = { key: `${level}`.concat(`-${index}`), title: name }
      treeData.push(node)

      if (children) {
        node.children = []
        this.buildTreeData(children, node.key, node.children)
      }
    })
  }
}
